import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getNews, addNews, deleteNews, type NovedadesRow } from './lib/db/schema';

const NewsManager: React.FC = () => {
  const [news, setNews] = useState<NovedadesRow[]>([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const newsData = await getNews();
      setNews(newsData);
    } catch (error) {
      console.error('Error al obtener novedades:', error);
      setErrorMessage('Error al cargar las novedades. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addNews({ url, title, publishDate });
      setUrl('');
      setTitle('');
      setPublishDate('');
      await fetchNews();
    } catch (error) {
      console.error('Error al agregar novedad:', error);
      setErrorMessage('Error al agregar la novedad. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteNews(id);
      await fetchNews();
    } catch (error) {
      console.error('Error al eliminar novedad:', error);
      setErrorMessage('Error al eliminar la novedad. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-gray-700">Cargando Novedades</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">{errorMessage}</p>
        <button 
          onClick={fetchNews}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Gestor de Novedades</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="url" className="block mb-2">URL:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publishDate" className="block mb-2">Fecha de publicación:</label>
          <input
            type="date"
            id="publishDate"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Agregar Novedad
        </button>
      </form>

      <h2 className="mb-4 text-xl font-semibold">Novedades Existentes</h2>
      {news.length > 0 ? (
        <ul>
          {news.map((item) => (
            <li key={item.id} className="p-4 mb-4 border rounded">
              <h3 className="font-bold">{item.title}</h3>
              <p>URL: <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{item.url}</a></p>
              <p>Fecha de publicación: {item.publishDate}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay novedades disponibles.</p>
      )}
    </div>
  );
};

export default NewsManager;