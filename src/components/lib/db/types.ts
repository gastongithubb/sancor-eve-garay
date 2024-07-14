import { Document, Types } from 'mongoose';

export interface IEmployee extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  entryTime: string;
  exitTime: string;
  hoursWorked: number;
  xLite: string;
}

export interface IBreakSchedule extends Document {
  employeeId: Types.ObjectId;
  day: string;
  startTime: string;
  endTime: string;
  week: number;
  month: number;
  year: number;
}

export interface IUser extends Document {
  id: string;
  name: string;
  responses: number;
  nps: number;
  csat: number;
  rd: number;
}

export interface INovedades extends Document {
  id: string;
  url: string;
  title: string;
  publishDate: string;
  estado: string;
  nueva_columna?: string;
}

export interface IAuthUser extends Document {
  id: string;
  email: string;
  password: string;
  name: string;
}