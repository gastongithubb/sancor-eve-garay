import mongoose from 'mongoose';
import { getModel } from './modelUtils';

export interface IEmployee {
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  entryTime: string;
  exitTime: string;
  hoursWorked: number;
  xLite: string;
}

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

export const Employee = getModel<IEmployee>('Employee', employeeSchema);
export type EmployeeDocument = mongoose.Document<unknown, {}, IEmployee> & IEmployee;