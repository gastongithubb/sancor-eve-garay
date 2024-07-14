import mongoose from 'mongoose';

export function getModel<T>(name: string, schema: mongoose.Schema<T>): mongoose.Model<T> {
  return mongoose.models[name] as mongoose.Model<T> || mongoose.model<T>(name, schema);
}