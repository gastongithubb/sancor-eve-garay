import { expandConfig } from '@libsql/core/config';
import Database from 'libsql';
import { Buffer } from 'node:buffer';
import { LibsqlError } from '@libsql/core/api';
import { supportedUrlLink, transactionModeToBegin, ResultSetImpl } from '@libsql/core/util';
import * as hrana from '@libsql/hrana-client';
import { encodeBaseUrl } from '@libsql/core/uri';
import promiseLimit from 'promise-limit';

/** @private */
function _createClient$3(config) {
    if (config.scheme !== "file") {
        throw new LibsqlError(`URL scheme ${JSON.stringify(config.scheme + ":")} is not supported by the local sqlite3 client. ` +
            `For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    const authority = config.authority;
    if (authority !== undefined) {
        const host = authority.host.toLowerCase();
        if (host !== "" && host !== "localhost") {
            throw new LibsqlError(`Invalid host in file URL: ${JSON.stringify(authority.host)}. ` +
                'A "file:" URL with an absolute path should start with one slash ("file:/absolute/path.db") ' +
                'or with three slashes ("file:///absolute/path.db"). ' +
                `For more information, please read ${supportedUrlLink}`, "URL_INVALID");
        }
        if (authority.port !== undefined) {
            throw new LibsqlError("File URL cannot have a port", "URL_INVALID");
        }
        if (authority.userinfo !== undefined) {
            throw new LibsqlError("File URL cannot have username and password", "URL_INVALID");
        }
    }
    const path = config.path;
    const options = {
        authToken: config.authToken,
        encryptionKey: config.encryptionKey,
        syncUrl: config.syncUrl,
        syncPeriod: config.syncInterval,
    };
    const db = new Database(path, options);
    executeStmt(db, "SELECT 1 AS checkThatTheDatabaseCanBeOpened", config.intMode);
    return new Sqlite3Client(path, options, db, config.intMode);
}
class Sqlite3Client {
    #path;
    #options;
    #db;
    #intMode;
    closed;
    protocol;
    /** @private */
    constructor(path, options, db, intMode) {
        this.#path = path;
        this.#options = options;
        this.#db = db;
        this.#intMode = intMode;
        this.closed = false;
        this.protocol = "file";
    }
    async execute(stmt) {
        this.#checkNotClosed();
        return executeStmt(this.#getDb(), stmt, this.#intMode);
    }
    async batch(stmts, mode = "deferred") {
        this.#checkNotClosed();
        const db = this.#getDb();
        try {
            executeStmt(db, transactionModeToBegin(mode), this.#intMode);
            const resultSets = stmts.map((stmt) => {
                if (!db.inTransaction) {
                    throw new LibsqlError("The transaction has been rolled back", "TRANSACTION_CLOSED");
                }
                return executeStmt(db, stmt, this.#intMode);
            });
            executeStmt(db, "COMMIT", this.#intMode);
            return resultSets;
        }
        finally {
            if (db.inTransaction) {
                executeStmt(db, "ROLLBACK", this.#intMode);
            }
        }
    }
    async transaction(mode = "write") {
        const db = this.#getDb();
        executeStmt(db, transactionModeToBegin(mode), this.#intMode);
        this.#db = null; // A new connection will be lazily created on next use
        return new Sqlite3Transaction(db, this.#intMode);
    }
    async executeMultiple(sql) {
        this.#checkNotClosed();
        const db = this.#getDb();
        try {
            return executeMultiple(db, sql);
        }
        finally {
            if (db.inTransaction) {
                executeStmt(db, "ROLLBACK", this.#intMode);
            }
        }
    }
    async sync() {
        this.#checkNotClosed();
        await this.#getDb().sync();
    }
    close() {
        this.closed = true;
        if (this.#db !== null) {
            this.#db.close();
        }
    }
    #checkNotClosed() {
        if (this.closed) {
            throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
        }
    }
    // Lazily creates the database connection and returns it
    #getDb() {
        if (this.#db === null) {
            this.#db = new Database(this.#path, this.#options);
        }
        return this.#db;
    }
}
class Sqlite3Transaction {
    #database;
    #intMode;
    /** @private */
    constructor(database, intMode) {
        this.#database = database;
        this.#intMode = intMode;
    }
    async execute(stmt) {
        this.#checkNotClosed();
        return executeStmt(this.#database, stmt, this.#intMode);
    }
    async batch(stmts) {
        return stmts.map((stmt) => {
            this.#checkNotClosed();
            return executeStmt(this.#database, stmt, this.#intMode);
        });
    }
    async executeMultiple(sql) {
        this.#checkNotClosed();
        return executeMultiple(this.#database, sql);
    }
    async rollback() {
        if (!this.#database.open) {
            return;
        }
        this.#checkNotClosed();
        executeStmt(this.#database, "ROLLBACK", this.#intMode);
    }
    async commit() {
        this.#checkNotClosed();
        executeStmt(this.#database, "COMMIT", this.#intMode);
    }
    close() {
        if (this.#database.inTransaction) {
            executeStmt(this.#database, "ROLLBACK", this.#intMode);
        }
    }
    get closed() {
        return !this.#database.inTransaction;
    }
    #checkNotClosed() {
        if (this.closed) {
            throw new LibsqlError("The transaction is closed", "TRANSACTION_CLOSED");
        }
    }
}
function executeStmt(db, stmt, intMode) {
    let sql;
    let args;
    if (typeof stmt === "string") {
        sql = stmt;
        args = [];
    }
    else {
        sql = stmt.sql;
        if (Array.isArray(stmt.args)) {
            args = stmt.args.map((value) => valueToSql(value, intMode));
        }
        else {
            args = {};
            for (const name in stmt.args) {
                const argName = name[0] === "@" || name[0] === "$" || name[0] === ":"
                    ? name.substring(1)
                    : name;
                args[argName] = valueToSql(stmt.args[name], intMode);
            }
        }
    }
    try {
        const sqlStmt = db.prepare(sql);
        sqlStmt.safeIntegers(true);
        let returnsData = true;
        try {
            sqlStmt.raw(true);
        }
        catch {
            // raw() throws an exception if the statement does not return data
            returnsData = false;
        }
        if (returnsData) {
            const columns = Array.from(sqlStmt.columns().map((col) => col.name));
            const columnTypes = Array.from(sqlStmt.columns().map((col) => col.type ?? ""));
            const rows = sqlStmt.all(args).map((sqlRow) => {
                return rowFromSql(sqlRow, columns, intMode);
            });
            // TODO: can we get this info from better-sqlite3?
            const rowsAffected = 0;
            const lastInsertRowid = undefined;
            return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
        }
        else {
            const info = sqlStmt.run(args);
            const rowsAffected = info.changes;
            const lastInsertRowid = BigInt(info.lastInsertRowid);
            return new ResultSetImpl([], [], [], rowsAffected, lastInsertRowid);
        }
    }
    catch (e) {
        throw mapSqliteError(e);
    }
}
function rowFromSql(sqlRow, columns, intMode) {
    const row = {};
    // make sure that the "length" property is not enumerable
    Object.defineProperty(row, "length", { value: sqlRow.length });
    for (let i = 0; i < sqlRow.length; ++i) {
        const value = valueFromSql(sqlRow[i], intMode);
        Object.defineProperty(row, i, { value });
        const column = columns[i];
        if (!Object.hasOwn(row, column)) {
            Object.defineProperty(row, column, {
                value,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        }
    }
    return row;
}
function valueFromSql(sqlValue, intMode) {
    if (typeof sqlValue === "bigint") {
        if (intMode === "number") {
            if (sqlValue < minSafeBigint || sqlValue > maxSafeBigint) {
                throw new RangeError("Received integer which cannot be safely represented as a JavaScript number");
            }
            return Number(sqlValue);
        }
        else if (intMode === "bigint") {
            return sqlValue;
        }
        else if (intMode === "string") {
            return "" + sqlValue;
        }
        else {
            throw new Error("Invalid value for IntMode");
        }
    }
    else if (sqlValue instanceof Buffer) {
        return sqlValue.buffer;
    }
    return sqlValue;
}
const minSafeBigint = -9007199254740991n;
const maxSafeBigint = 9007199254740991n;
function valueToSql(value, intMode) {
    if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
        }
        return value;
    }
    else if (typeof value === "bigint") {
        if (value < minInteger || value > maxInteger) {
            throw new RangeError("bigint is too large to be represented as a 64-bit integer and passed as argument");
        }
        return value;
    }
    else if (typeof value === "boolean") {
        switch (intMode) {
            case "bigint":
                return value ? 1n : 0n;
            case "string":
                return value ? "1" : "0";
            default:
                return value ? 1 : 0;
        }
    }
    else if (value instanceof ArrayBuffer) {
        return Buffer.from(value);
    }
    else if (value instanceof Date) {
        return value.valueOf();
    }
    else if (value === undefined) {
        throw new TypeError("undefined cannot be passed as argument to the database");
    }
    else {
        return value;
    }
}
const minInteger = -9223372036854775808n;
const maxInteger = 9223372036854775807n;
function executeMultiple(db, sql) {
    try {
        db.exec(sql);
    }
    catch (e) {
        throw mapSqliteError(e);
    }
}
function mapSqliteError(e) {
    if (e instanceof Database.SqliteError) {
        return new LibsqlError(e.message, e.code, e.rawCode, e);
    }
    return e;
}

class HranaTransaction {
    #mode;
    #version;
    // Promise that is resolved when the BEGIN statement completes, or `undefined` if we haven't executed the
    // BEGIN statement yet.
    #started;
    /** @private */
    constructor(mode, version) {
        this.#mode = mode;
        this.#version = version;
        this.#started = undefined;
    }
    execute(stmt) {
        return this.batch([stmt]).then((results) => results[0]);
    }
    async batch(stmts) {
        const stream = this._getStream();
        if (stream.closed) {
            throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
        }
        try {
            const hranaStmts = stmts.map(stmtToHrana);
            let rowsPromises;
            if (this.#started === undefined) {
                // The transaction hasn't started yet, so we need to send the BEGIN statement in a batch with
                // `hranaStmts`.
                this._getSqlCache().apply(hranaStmts);
                const batch = stream.batch(this.#version >= 3);
                const beginStep = batch.step();
                const beginPromise = beginStep.run(transactionModeToBegin(this.#mode));
                // Execute the `hranaStmts` only if the BEGIN succeeded, to make sure that we don't execute it
                // outside of a transaction.
                let lastStep = beginStep;
                rowsPromises = hranaStmts.map((hranaStmt) => {
                    const stmtStep = batch
                        .step()
                        .condition(hrana.BatchCond.ok(lastStep));
                    if (this.#version >= 3) {
                        // If the Hrana version supports it, make sure that we are still in a transaction
                        stmtStep.condition(hrana.BatchCond.not(hrana.BatchCond.isAutocommit(batch)));
                    }
                    const rowsPromise = stmtStep.query(hranaStmt);
                    rowsPromise.catch(() => undefined); // silence Node warning
                    lastStep = stmtStep;
                    return rowsPromise;
                });
                // `this.#started` is resolved successfully only if the batch and the BEGIN statement inside
                // of the batch are both successful.
                this.#started = batch
                    .execute()
                    .then(() => beginPromise)
                    .then(() => undefined);
                try {
                    await this.#started;
                }
                catch (e) {
                    // If the BEGIN failed, the transaction is unusable and we must close it. However, if the
                    // BEGIN suceeds and `hranaStmts` fail, the transaction is _not_ closed.
                    this.close();
                    throw e;
                }
            }
            else {
                if (this.#version < 3) {
                    // The transaction has started, so we must wait until the BEGIN statement completed to make
                    // sure that we don't execute `hranaStmts` outside of a transaction.
                    await this.#started;
                }
                else {
                    // The transaction has started, but we will use `hrana.BatchCond.isAutocommit()` to make
                    // sure that we don't execute `hranaStmts` outside of a transaction, so we don't have to
                    // wait for `this.#started`
                }
                this._getSqlCache().apply(hranaStmts);
                const batch = stream.batch(this.#version >= 3);
                let lastStep = undefined;
                rowsPromises = hranaStmts.map((hranaStmt) => {
                    const stmtStep = batch.step();
                    if (lastStep !== undefined) {
                        stmtStep.condition(hrana.BatchCond.ok(lastStep));
                    }
                    if (this.#version >= 3) {
                        stmtStep.condition(hrana.BatchCond.not(hrana.BatchCond.isAutocommit(batch)));
                    }
                    const rowsPromise = stmtStep.query(hranaStmt);
                    rowsPromise.catch(() => undefined); // silence Node warning
                    lastStep = stmtStep;
                    return rowsPromise;
                });
                await batch.execute();
            }
            const resultSets = [];
            for (const rowsPromise of rowsPromises) {
                const rows = await rowsPromise;
                if (rows === undefined) {
                    throw new LibsqlError("Statement in a transaction was not executed, " +
                        "probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
                }
                resultSets.push(resultSetFromHrana(rows));
            }
            return resultSets;
        }
        catch (e) {
            throw mapHranaError(e);
        }
    }
    async executeMultiple(sql) {
        const stream = this._getStream();
        if (stream.closed) {
            throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
        }
        try {
            if (this.#started === undefined) {
                // If the transaction hasn't started yet, start it now
                this.#started = stream
                    .run(transactionModeToBegin(this.#mode))
                    .then(() => undefined);
                try {
                    await this.#started;
                }
                catch (e) {
                    this.close();
                    throw e;
                }
            }
            else {
                // Wait until the transaction has started
                await this.#started;
            }
            await stream.sequence(sql);
        }
        catch (e) {
            throw mapHranaError(e);
        }
    }
    async rollback() {
        try {
            const stream = this._getStream();
            if (stream.closed) {
                return;
            }
            if (this.#started !== undefined) {
                // We don't have to wait for the BEGIN statement to complete. If the BEGIN fails, we will
                // execute a ROLLBACK outside of an active transaction, which should be harmless.
            }
            else {
                // We did nothing in the transaction, so there is nothing to rollback.
                return;
            }
            // Pipeline the ROLLBACK statement and the stream close.
            const promise = stream.run("ROLLBACK").catch((e) => {
                throw mapHranaError(e);
            });
            stream.closeGracefully();
            await promise;
        }
        catch (e) {
            throw mapHranaError(e);
        }
        finally {
            // `this.close()` may close the `hrana.Client`, which aborts all pending stream requests, so we
            // must call it _after_ we receive the ROLLBACK response.
            // Also note that the current stream should already be closed, but we need to call `this.close()`
            // anyway, because it may need to do more cleanup.
            this.close();
        }
    }
    async commit() {
        // (this method is analogous to `rollback()`)
        try {
            const stream = this._getStream();
            if (stream.closed) {
                throw new LibsqlError("Cannot commit the transaction because it is already closed", "TRANSACTION_CLOSED");
            }
            if (this.#started !== undefined) {
                // Make sure to execute the COMMIT only if the BEGIN was successful.
                await this.#started;
            }
            else {
                return;
            }
            const promise = stream.run("COMMIT").catch((e) => {
                throw mapHranaError(e);
            });
            stream.closeGracefully();
            await promise;
        }
        catch (e) {
            throw mapHranaError(e);
        }
        finally {
            this.close();
        }
    }
}
async function executeHranaBatch(mode, version, batch, hranaStmts) {
    const beginStep = batch.step();
    const beginPromise = beginStep.run(transactionModeToBegin(mode));
    let lastStep = beginStep;
    const stmtPromises = hranaStmts.map((hranaStmt) => {
        const stmtStep = batch.step().condition(hrana.BatchCond.ok(lastStep));
        if (version >= 3) {
            stmtStep.condition(hrana.BatchCond.not(hrana.BatchCond.isAutocommit(batch)));
        }
        const stmtPromise = stmtStep.query(hranaStmt);
        lastStep = stmtStep;
        return stmtPromise;
    });
    const commitStep = batch.step().condition(hrana.BatchCond.ok(lastStep));
    if (version >= 3) {
        commitStep.condition(hrana.BatchCond.not(hrana.BatchCond.isAutocommit(batch)));
    }
    const commitPromise = commitStep.run("COMMIT");
    const rollbackStep = batch
        .step()
        .condition(hrana.BatchCond.not(hrana.BatchCond.ok(commitStep)));
    rollbackStep.run("ROLLBACK").catch((_) => undefined);
    await batch.execute();
    const resultSets = [];
    await beginPromise;
    for (const stmtPromise of stmtPromises) {
        const hranaRows = await stmtPromise;
        if (hranaRows === undefined) {
            throw new LibsqlError("Statement in a batch was not executed, probably because the transaction has been rolled back", "TRANSACTION_CLOSED");
        }
        resultSets.push(resultSetFromHrana(hranaRows));
    }
    await commitPromise;
    return resultSets;
}
function stmtToHrana(stmt) {
    if (typeof stmt === "string") {
        return new hrana.Stmt(stmt);
    }
    const hranaStmt = new hrana.Stmt(stmt.sql);
    if (Array.isArray(stmt.args)) {
        hranaStmt.bindIndexes(stmt.args);
    }
    else {
        for (const [key, value] of Object.entries(stmt.args)) {
            hranaStmt.bindName(key, value);
        }
    }
    return hranaStmt;
}
function resultSetFromHrana(hranaRows) {
    const columns = hranaRows.columnNames.map((c) => c ?? "");
    const columnTypes = hranaRows.columnDecltypes.map((c) => c ?? "");
    const rows = hranaRows.rows;
    const rowsAffected = hranaRows.affectedRowCount;
    const lastInsertRowid = hranaRows.lastInsertRowid !== undefined
        ? hranaRows.lastInsertRowid
        : undefined;
    return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
}
function mapHranaError(e) {
    if (e instanceof hrana.ClientError) {
        const code = mapHranaErrorCode(e);
        return new LibsqlError(e.message, code, undefined, e);
    }
    return e;
}
function mapHranaErrorCode(e) {
    if (e instanceof hrana.ResponseError && e.code !== undefined) {
        return e.code;
    }
    else if (e instanceof hrana.ProtoError) {
        return "HRANA_PROTO_ERROR";
    }
    else if (e instanceof hrana.ClosedError) {
        return e.cause instanceof hrana.ClientError
            ? mapHranaErrorCode(e.cause)
            : "HRANA_CLOSED_ERROR";
    }
    else if (e instanceof hrana.WebSocketError) {
        return "HRANA_WEBSOCKET_ERROR";
    }
    else if (e instanceof hrana.HttpServerError) {
        return "SERVER_ERROR";
    }
    else if (e instanceof hrana.ProtocolVersionError) {
        return "PROTOCOL_VERSION_ERROR";
    }
    else if (e instanceof hrana.InternalError) {
        return "INTERNAL_ERROR";
    }
    else {
        return "UNKNOWN";
    }
}

class SqlCache {
    #owner;
    #sqls;
    capacity;
    constructor(owner, capacity) {
        this.#owner = owner;
        this.#sqls = new Lru();
        this.capacity = capacity;
    }
    // Replaces SQL strings with cached `hrana.Sql` objects in the statements in `hranaStmts`. After this
    // function returns, we guarantee that all `hranaStmts` refer to valid (not closed) `hrana.Sql` objects,
    // but _we may invalidate any other `hrana.Sql` objects_ (by closing them, thus removing them from the
    // server).
    //
    // In practice, this means that after calling this function, you can use the statements only up to the
    // first `await`, because concurrent code may also use the cache and invalidate those statements.
    apply(hranaStmts) {
        if (this.capacity <= 0) {
            return;
        }
        const usedSqlObjs = new Set();
        for (const hranaStmt of hranaStmts) {
            if (typeof hranaStmt.sql !== "string") {
                continue;
            }
            const sqlText = hranaStmt.sql;
            // Stored SQL cannot exceed 5kb.
            // https://github.com/tursodatabase/libsql/blob/e9d637e051685f92b0da43849507b5ef4232fbeb/libsql-server/src/hrana/http/request.rs#L10
            if (sqlText.length >= 5000) {
                continue;
            }
            let sqlObj = this.#sqls.get(sqlText);
            if (sqlObj === undefined) {
                while (this.#sqls.size + 1 > this.capacity) {
                    const [evictSqlText, evictSqlObj] = this.#sqls.peekLru();
                    if (usedSqlObjs.has(evictSqlObj)) {
                        // The SQL object that we are trying to evict is already in use in this batch, so we
                        // must not evict and close it.
                        break;
                    }
                    evictSqlObj.close();
                    this.#sqls.delete(evictSqlText);
                }
                if (this.#sqls.size + 1 <= this.capacity) {
                    sqlObj = this.#owner.storeSql(sqlText);
                    this.#sqls.set(sqlText, sqlObj);
                }
            }
            if (sqlObj !== undefined) {
                hranaStmt.sql = sqlObj;
                usedSqlObjs.add(sqlObj);
            }
        }
    }
}
class Lru {
    // This maps keys to the cache values. The entries are ordered by their last use (entires that were used
    // most recently are at the end).
    #cache;
    constructor() {
        this.#cache = new Map();
    }
    get(key) {
        const value = this.#cache.get(key);
        if (value !== undefined) {
            // move the entry to the back of the Map
            this.#cache.delete(key);
            this.#cache.set(key, value);
        }
        return value;
    }
    set(key, value) {
        this.#cache.set(key, value);
    }
    peekLru() {
        for (const entry of this.#cache.entries()) {
            return entry;
        }
        return undefined;
    }
    delete(key) {
        this.#cache.delete(key);
    }
    get size() {
        return this.#cache.size;
    }
}

const SCHEMA_MIGRATION_SLEEP_TIME_IN_MS = 1000;
const SCHEMA_MIGRATION_MAX_RETRIES = 30;
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function isMigrationJobFinished({ authToken, baseUrl, jobId, }) {
    const url = normalizeURLScheme(baseUrl + `/v1/jobs/${jobId}`);
    const result = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    const json = (await result.json());
    const job = json;
    if (result.status !== 200) {
        throw new Error(`Unexpected status code while fetching job status for migration with id ${jobId}: ${result.status}`);
    }
    if (job.status == "RunFailure") {
        throw new Error("Migration job failed");
    }
    return job.status == "RunSuccess";
}
function normalizeURLScheme(url) {
    if (url.startsWith("ws://")) {
        return url.replace("ws://", "http://");
    }
    if (url.startsWith("wss://")) {
        return url.replace("wss://", "https://");
    }
    return url;
}
async function getIsSchemaDatabase({ authToken, baseUrl, }) {
    try {
        if (baseUrl.startsWith("http://127.0.0.1")) {
            return false;
        }
        const url = normalizeURLScheme(baseUrl + "/v1/jobs");
        const result = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (result.status === 404 || result.status === 500) {
            return false;
        }
        const json = (await result.json());
        const isChildDatabase = result.status === 400 && json.error === "Invalid namespace";
        return !isChildDatabase;
    }
    catch (e) {
        console.error([
            `There has been an error while retrieving the database type.`,
            `Debug information:`,
            `- URL: ${baseUrl}`,
            `- Response Status Code: ${"N/A"}`,
        ].join("\n"));
        throw e;
    }
}
async function getLastMigrationJob({ authToken, baseUrl, }) {
    const url = normalizeURLScheme(baseUrl + "/v1/jobs");
    const result = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    if (result.status !== 200) {
        throw new Error("Unexpected status code while fetching migration jobs: " +
            result.status);
    }
    const json = (await result.json());
    if (!json.migrations || json.migrations.length === 0) {
        throw new Error("No migrations found");
    }
    const migrations = json.migrations || [];
    let lastJob;
    for (const migration of migrations) {
        if (migration.job_id > (lastJob?.job_id || 0)) {
            lastJob = migration;
        }
    }
    if (!lastJob) {
        throw new Error("No migration job found");
    }
    if (lastJob?.status === "RunFailure") {
        throw new Error("Last migration job failed");
    }
    return lastJob;
}
async function waitForLastMigrationJobToFinish({ authToken, baseUrl, }) {
    const lastMigrationJob = await getLastMigrationJob({
        authToken: authToken,
        baseUrl,
    });
    if (lastMigrationJob.status !== "RunSuccess") {
        let i = 0;
        while (i < SCHEMA_MIGRATION_MAX_RETRIES) {
            i++;
            const isLastMigrationJobFinished = await isMigrationJobFinished({
                authToken: authToken,
                baseUrl,
                jobId: lastMigrationJob.job_id,
            });
            if (isLastMigrationJobFinished) {
                break;
            }
            await sleep(SCHEMA_MIGRATION_SLEEP_TIME_IN_MS);
        }
    }
}

/** @private */
function _createClient$2(config) {
    if (config.scheme !== "wss" && config.scheme !== "ws") {
        throw new LibsqlError('The WebSocket client supports only "libsql:", "wss:" and "ws:" URLs, ' +
            `got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    if (config.encryptionKey !== undefined) {
        throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
    }
    if (config.scheme === "ws" && config.tls) {
        throw new LibsqlError(`A "ws:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
    }
    else if (config.scheme === "wss" && !config.tls) {
        throw new LibsqlError(`A "wss:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
    }
    const url = encodeBaseUrl(config.scheme, config.authority, config.path);
    let client;
    try {
        client = hrana.openWs(url, config.authToken);
    }
    catch (e) {
        if (e instanceof hrana.WebSocketUnsupportedError) {
            const suggestedScheme = config.scheme === "wss" ? "https" : "http";
            const suggestedUrl = encodeBaseUrl(suggestedScheme, config.authority, config.path);
            throw new LibsqlError("This environment does not support WebSockets, please switch to the HTTP client by using " +
                `a "${suggestedScheme}:" URL (${JSON.stringify(suggestedUrl)}). ` +
                `For more information, please read ${supportedUrlLink}`, "WEBSOCKETS_NOT_SUPPORTED");
        }
        throw mapHranaError(e);
    }
    return new WsClient(client, url, config.authToken, config.intMode, config.concurrency);
}
const maxConnAgeMillis = 60 * 1000;
const sqlCacheCapacity$1 = 100;
class WsClient {
    #url;
    #authToken;
    #intMode;
    // State of the current connection. The `hrana.WsClient` inside may be closed at any moment due to an
    // asynchronous error.
    #connState;
    // If defined, this is a connection that will be used in the future, once it is ready.
    #futureConnState;
    closed;
    protocol;
    #isSchemaDatabase;
    #promiseLimitFunction;
    /** @private */
    constructor(client, url, authToken, intMode, concurrency) {
        this.#url = url;
        this.#authToken = authToken;
        this.#intMode = intMode;
        this.#connState = this.#openConn(client);
        this.#futureConnState = undefined;
        this.closed = false;
        this.protocol = "ws";
        this.#promiseLimitFunction = promiseLimit(concurrency);
    }
    getIsSchemaDatabase() {
        if (this.#isSchemaDatabase === undefined) {
            this.#isSchemaDatabase = getIsSchemaDatabase({
                authToken: this.#authToken,
                baseUrl: this.#url.origin,
            });
        }
        return this.#isSchemaDatabase;
    }
    async limit(fn) {
        return this.#promiseLimitFunction(fn);
    }
    async execute(stmt) {
        return this.limit(async () => {
            const streamState = await this.#openStream();
            try {
                const isSchemaDatabasePromise = this.getIsSchemaDatabase();
                const hranaStmt = stmtToHrana(stmt);
                // Schedule all operations synchronously, so they will be pipelined and executed in a single
                // network roundtrip.
                streamState.conn.sqlCache.apply([hranaStmt]);
                const hranaRowsPromise = streamState.stream.query(hranaStmt);
                streamState.stream.closeGracefully();
                const hranaRowsResult = await hranaRowsPromise;
                const isSchemaDatabase = await isSchemaDatabasePromise;
                if (isSchemaDatabase) {
                    await waitForLastMigrationJobToFinish({
                        authToken: this.#authToken,
                        baseUrl: this.#url.origin,
                    });
                }
                return resultSetFromHrana(hranaRowsResult);
            }
            catch (e) {
                throw mapHranaError(e);
            }
            finally {
                this._closeStream(streamState);
            }
        });
    }
    async batch(stmts, mode = "deferred") {
        return this.limit(async () => {
            const streamState = await this.#openStream();
            try {
                const isSchemaDatabasePromise = this.getIsSchemaDatabase();
                const hranaStmts = stmts.map(stmtToHrana);
                const version = await streamState.conn.client.getVersion();
                // Schedule all operations synchronously, so they will be pipelined and executed in a single
                // network roundtrip.
                streamState.conn.sqlCache.apply(hranaStmts);
                const batch = streamState.stream.batch(version >= 3);
                const resultsPromise = executeHranaBatch(mode, version, batch, hranaStmts);
                const results = await resultsPromise;
                const isSchemaDatabase = await isSchemaDatabasePromise;
                if (isSchemaDatabase) {
                    await waitForLastMigrationJobToFinish({
                        authToken: this.#authToken,
                        baseUrl: this.#url.origin,
                    });
                }
                return results;
            }
            catch (e) {
                throw mapHranaError(e);
            }
            finally {
                this._closeStream(streamState);
            }
        });
    }
    async transaction(mode = "write") {
        return this.limit(async () => {
            const streamState = await this.#openStream();
            try {
                const version = await streamState.conn.client.getVersion();
                // the BEGIN statement will be batched with the first statement on the transaction to save a
                // network roundtrip
                return new WsTransaction(this, streamState, mode, version);
            }
            catch (e) {
                this._closeStream(streamState);
                throw mapHranaError(e);
            }
        });
    }
    async executeMultiple(sql) {
        return this.limit(async () => {
            const streamState = await this.#openStream();
            try {
                // Schedule all operations synchronously, so they will be pipelined and executed in a single
                // network roundtrip.
                const promise = streamState.stream.sequence(sql);
                streamState.stream.closeGracefully();
                await promise;
            }
            catch (e) {
                throw mapHranaError(e);
            }
            finally {
                this._closeStream(streamState);
            }
        });
    }
    sync() {
        return Promise.resolve();
    }
    async #openStream() {
        if (this.closed) {
            throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
        }
        const now = new Date();
        const ageMillis = now.valueOf() - this.#connState.openTime.valueOf();
        if (ageMillis > maxConnAgeMillis &&
            this.#futureConnState === undefined) {
            // The existing connection is too old, let's open a new one.
            const futureConnState = this.#openConn();
            this.#futureConnState = futureConnState;
            // However, if we used `futureConnState` immediately, we would introduce additional latency,
            // because we would have to wait for the WebSocket handshake to complete, even though we may a
            // have perfectly good existing connection in `this.#connState`!
            //
            // So we wait until the `hrana.Client.getVersion()` operation completes (which happens when the
            // WebSocket hanshake completes), and only then we replace `this.#connState` with
            // `futureConnState`, which is stored in `this.#futureConnState` in the meantime.
            futureConnState.client.getVersion().then((_version) => {
                if (this.#connState !== futureConnState) {
                    // We need to close `this.#connState` before we replace it. However, it is possible
                    // that `this.#connState` has already been replaced: see the code below.
                    if (this.#connState.streamStates.size === 0) {
                        this.#connState.client.close();
                    }
                }
                this.#connState = futureConnState;
                this.#futureConnState = undefined;
            }, (_e) => {
                // If the new connection could not be established, let's just ignore the error and keep
                // using the existing connection.
                this.#futureConnState = undefined;
            });
        }
        if (this.#connState.client.closed) {
            // An error happened on this connection and it has been closed. Let's try to seamlessly reconnect.
            try {
                if (this.#futureConnState !== undefined) {
                    // We are already in the process of opening a new connection, so let's just use it
                    // immediately.
                    this.#connState = this.#futureConnState;
                }
                else {
                    this.#connState = this.#openConn();
                }
            }
            catch (e) {
                throw mapHranaError(e);
            }
        }
        const connState = this.#connState;
        try {
            // Now we wait for the WebSocket handshake to complete (if it hasn't completed yet). Note that
            // this does not increase latency, because any messages that we would send on the WebSocket before
            // the handshake would be queued until the handshake is completed anyway.
            if (connState.useSqlCache === undefined) {
                connState.useSqlCache =
                    (await connState.client.getVersion()) >= 2;
                if (connState.useSqlCache) {
                    connState.sqlCache.capacity = sqlCacheCapacity$1;
                }
            }
            const stream = connState.client.openStream();
            stream.intMode = this.#intMode;
            const streamState = { conn: connState, stream };
            connState.streamStates.add(streamState);
            return streamState;
        }
        catch (e) {
            throw mapHranaError(e);
        }
    }
    #openConn(client) {
        try {
            client ??= hrana.openWs(this.#url, this.#authToken);
            return {
                client,
                useSqlCache: undefined,
                sqlCache: new SqlCache(client, 0),
                openTime: new Date(),
                streamStates: new Set(),
            };
        }
        catch (e) {
            throw mapHranaError(e);
        }
    }
    _closeStream(streamState) {
        streamState.stream.close();
        const connState = streamState.conn;
        connState.streamStates.delete(streamState);
        if (connState.streamStates.size === 0 &&
            connState !== this.#connState) {
            // We are not using this connection anymore and this is the last stream that was using it, so we
            // must close it now.
            connState.client.close();
        }
    }
    close() {
        this.#connState.client.close();
        this.closed = true;
    }
}
class WsTransaction extends HranaTransaction {
    #client;
    #streamState;
    /** @private */
    constructor(client, state, mode, version) {
        super(mode, version);
        this.#client = client;
        this.#streamState = state;
    }
    /** @private */
    _getStream() {
        return this.#streamState.stream;
    }
    /** @private */
    _getSqlCache() {
        return this.#streamState.conn.sqlCache;
    }
    close() {
        this.#client._closeStream(this.#streamState);
    }
    get closed() {
        return this.#streamState.stream.closed;
    }
}

/** @private */
function _createClient$1(config) {
    if (config.scheme !== "https" && config.scheme !== "http") {
        throw new LibsqlError('The HTTP client supports only "libsql:", "https:" and "http:" URLs, ' +
            `got ${JSON.stringify(config.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
    }
    if (config.encryptionKey !== undefined) {
        throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
    }
    if (config.scheme === "http" && config.tls) {
        throw new LibsqlError(`A "http:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
    }
    else if (config.scheme === "https" && !config.tls) {
        throw new LibsqlError(`A "https:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
    }
    const url = encodeBaseUrl(config.scheme, config.authority, config.path);
    return new HttpClient(url, config.authToken, config.intMode, config.fetch, config.concurrency);
}
const sqlCacheCapacity = 30;
class HttpClient {
    #client;
    protocol;
    #url;
    #authToken;
    #isSchemaDatabase;
    #promiseLimitFunction;
    /** @private */
    constructor(url, authToken, intMode, customFetch, concurrency) {
        this.#client = hrana.openHttp(url, authToken, customFetch);
        this.#client.intMode = intMode;
        this.protocol = "http";
        this.#url = url;
        this.#authToken = authToken;
        this.#promiseLimitFunction = promiseLimit(concurrency);
    }
    getIsSchemaDatabase() {
        if (this.#isSchemaDatabase === undefined) {
            this.#isSchemaDatabase = getIsSchemaDatabase({
                authToken: this.#authToken,
                baseUrl: this.#url.origin,
            });
        }
        return this.#isSchemaDatabase;
    }
    async limit(fn) {
        return this.#promiseLimitFunction(fn);
    }
    async execute(stmt) {
        return this.limit(async () => {
            try {
                const isSchemaDatabasePromise = this.getIsSchemaDatabase();
                const hranaStmt = stmtToHrana(stmt);
                // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the statement and
                // close the stream in a single HTTP request.
                let rowsPromise;
                const stream = this.#client.openStream();
                try {
                    rowsPromise = stream.query(hranaStmt);
                }
                finally {
                    stream.closeGracefully();
                }
                const rowsResult = await rowsPromise;
                const isSchemaDatabase = await isSchemaDatabasePromise;
                if (isSchemaDatabase) {
                    await waitForLastMigrationJobToFinish({
                        authToken: this.#authToken,
                        baseUrl: this.#url.origin,
                    });
                }
                return resultSetFromHrana(rowsResult);
            }
            catch (e) {
                throw mapHranaError(e);
            }
        });
    }
    async batch(stmts, mode = "deferred") {
        return this.limit(async () => {
            try {
                const isSchemaDatabasePromise = this.getIsSchemaDatabase();
                const hranaStmts = stmts.map(stmtToHrana);
                const version = await this.#client.getVersion();
                // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the batch and
                // close the stream in a single HTTP request.
                let resultsPromise;
                const stream = this.#client.openStream();
                try {
                    // It makes sense to use a SQL cache even for a single batch, because it may contain the same
                    // statement repeated multiple times.
                    const sqlCache = new SqlCache(stream, sqlCacheCapacity);
                    sqlCache.apply(hranaStmts);
                    // TODO: we do not use a cursor here, because it would cause three roundtrips:
                    // 1. pipeline request to store SQL texts
                    // 2. cursor request
                    // 3. pipeline request to close the stream
                    const batch = stream.batch(false);
                    resultsPromise = executeHranaBatch(mode, version, batch, hranaStmts);
                }
                finally {
                    stream.closeGracefully();
                }
                const results = await resultsPromise;
                const isSchemaDatabase = await isSchemaDatabasePromise;
                if (isSchemaDatabase) {
                    await waitForLastMigrationJobToFinish({
                        authToken: this.#authToken,
                        baseUrl: this.#url.origin,
                    });
                }
                return results;
            }
            catch (e) {
                throw mapHranaError(e);
            }
        });
    }
    async transaction(mode = "write") {
        return this.limit(async () => {
            try {
                const version = await this.#client.getVersion();
                return new HttpTransaction(this.#client.openStream(), mode, version);
            }
            catch (e) {
                throw mapHranaError(e);
            }
        });
    }
    async executeMultiple(sql) {
        return this.limit(async () => {
            try {
                // Pipeline all operations, so `hrana.HttpClient` can open the stream, execute the sequence and
                // close the stream in a single HTTP request.
                let promise;
                const stream = this.#client.openStream();
                try {
                    promise = stream.sequence(sql);
                }
                finally {
                    stream.closeGracefully();
                }
                await promise;
            }
            catch (e) {
                throw mapHranaError(e);
            }
        });
    }
    sync() {
        throw new LibsqlError("sync not supported in http mode", "SYNC_NOT_SUPPORTED");
    }
    close() {
        this.#client.close();
    }
    get closed() {
        return this.#client.closed;
    }
}
class HttpTransaction extends HranaTransaction {
    #stream;
    #sqlCache;
    /** @private */
    constructor(stream, mode, version) {
        super(mode, version);
        this.#stream = stream;
        this.#sqlCache = new SqlCache(stream, sqlCacheCapacity);
    }
    /** @private */
    _getStream() {
        return this.#stream;
    }
    /** @private */
    _getSqlCache() {
        return this.#sqlCache;
    }
    close() {
        this.#stream.close();
    }
    get closed() {
        return this.#stream.closed;
    }
}

/** Creates a {@link Client} object.
 *
 * You must pass at least an `url` in the {@link Config} object.
 */
function createClient(config) {
    return _createClient(expandConfig(config, true));
}
function _createClient(config) {
    if (config.scheme === "wss" || config.scheme === "ws") {
        return _createClient$2(config);
    }
    else if (config.scheme === "https" || config.scheme === "http") {
        return _createClient$1(config);
    }
    else {
        return _createClient$3(config);
    }
}

const config = {
  tursoConnectionUrl: "libsql://metrics-nps-gastongithubb.turso.io",
  tursoAuthToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjA4NDU2NTUsImlkIjoiYjI2MjM2YmUtYWExYS00YzY4LTk2MDktZDg3NDNhZGUxODViIn0.cICW-bwrI3TRyXKm2bTgwnrRTKczHfIMgVUoi6vRPmZ2ydUxSfRm9T5ZhFSnZuT87hEoFb-IQQ69FBDeW-WVDg"
};

export { config as a, createClient as c };
