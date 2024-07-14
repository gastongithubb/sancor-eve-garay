import mongoose from 'mongoose';

// Interfaces
interface IEmployee extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  entryTime: string;
  exitTime: string;
  hoursWorked: number;
  xLite: string;
}

interface IBreakSchedule extends mongoose.Document {
  employeeId: mongoose.Types.ObjectId;
  day: string;
  startTime: string;
  endTime: string;
  week: number;
  month: number;
  year: number;
}

interface IUser extends mongoose.Document {
  name: string;
  responses: number;
  nps: number;
  csat: number;
  rd: number;
}

interface INovedades extends mongoose.Document {
  url: string;
  title: string;
  publishDate: string;
}

interface IAuthUser extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  name: string;
}

// Esquemas
const employeeSchema = new mongoose.Schema<IEmployee>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  dni: { type: String, required: true },
  entryTime: { type: String, required: true },
  exitTime: { type: String, required: true },
  hoursWorked: { type: Number, required: true },
  xLite: { type: String, required: true }
});

const breakScheduleSchema = new mongoose.Schema<IBreakSchedule>({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  week: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
});

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  responses: { type: Number, default: 0 },
  nps: { type: Number, default: 0 },
  csat: { type: Number, default: 0 },
  rd: { type: Number, default: 0 },
});

const novedadesSchema = new mongoose.Schema<INovedades>({
  url: { type: String, required: true },
  title: { type: String, required: true },
  publishDate: { type: String, required: true },
});

const authUserSchema = new mongoose.Schema<IAuthUser>({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

// Función para crear o recuperar modelos
function getModel<T extends mongoose.Document>(
  modelName: string,
  schema: mongoose.Schema<T>
): mongoose.Model<T> {
  return (mongoose.models[modelName] as mongoose.Model<T>) || mongoose.model<T>(modelName, schema);
}

// Exportar modelos
export const Employee = getModel<IEmployee>('Employee', employeeSchema);
export const BreakSchedule = getModel<IBreakSchedule>('BreakSchedule', breakScheduleSchema);
export const User = getModel<IUser>('User', userSchema);
export const Novedades = getModel<INovedades>('Novedades', novedadesSchema);
export const AuthUser = getModel<IAuthUser>('AuthUser', authUserSchema);

// Exportar tipos
export type EmployeeDocument = IEmployee;
export type BreakScheduleDocument = IBreakSchedule;
export type UserDocument = IUser;
export type NovedadesDocument = INovedades;
export type AuthUserDocument = IAuthUser;