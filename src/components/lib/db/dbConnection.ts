import mongoose from 'mongoose';
import { config } from '../../../config';

const MONGODB_URI = `mongodb://localhost:4321/${config.databaseName}`;

const connectWithRetry = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('Conectado a MongoDB en el puerto 4321');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    console.log('Reintentando en 5 segundos...');
    setTimeout(connectWithRetry, 5000);
  }
};

export const initDatabase = () => {
  connectWithRetry();

  mongoose.connection.on('disconnected', connectWithRetry);
  mongoose.connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
  mongoose.connection.once('open', function() {
    console.log('Conexión a MongoDB establecida con éxito');
  });
};

export const db = mongoose.connection;
