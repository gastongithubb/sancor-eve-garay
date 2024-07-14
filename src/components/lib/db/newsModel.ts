import mongoose from 'mongoose';

// Definición del esquema para el modelo News
const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  publishedAt: { type: Date, default: Date.now },
});

// Verificar si el modelo ya está definido antes de definirlo
let News;
try {
  News = mongoose.model('News');
} catch (error) {
  // Si no está definido, lo definimos con el esquema creado
  News = mongoose.model('News', newsSchema);
}

// Exportar el modelo News
export default News;
