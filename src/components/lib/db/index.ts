import { createClient } from '@libsql/client';
import { config } from '../../../config';

export const client = createClient({
  url: config.tursoConnectionUrl,
  authToken: config.tursoAuthToken,
});