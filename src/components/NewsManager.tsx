import React, { useState, useEffect } from 'react';
import { getNews, addNews, deleteNews, toggleEstadoNoticia, type NovedadesRow } from './lib/db';

const NewsManager: React.FC = () => {
  const [news, setNews] = useState<NovedadesRow[]>([]);
  const [newNewsItem, setNewNewsItem] = useState({ url: '', title: '', publishDate: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const fetchedNews = await getNews();
      setNews(fetchedNews);
    } catch (error) {
      setError('Error al obtener las noticias');
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewNewsItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addNews({
        ...newNewsItem,
        estado: 1 // Por defecto, la noticia se añade como activa
      });
      setNewNewsItem({ url: '', title: '', publishDate: '' });
      fetchNews();
    } catch (error) {
      setError('Error al añadir la noticia');
      console.error(error);
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      await deleteNews(id);
      fetchNews();
    } catch (error) {
      setError('Error al eliminar la noticia');
      console.error(error);
    }
  };

  const handleToggleEstado = async (id: number) => {
    try {
      await toggleEstadoNoticia(id);
      fetchNews();
    } catch (error) {
      setError('Error al cambiar el estado de la noticia');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Gestor de Noticias</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddNews}>
        <input
          type="text"
          name="url"
          value={newNewsItem.url}
          onChange={handleInputChange}
          placeholder="URL"
          required
        />
        <input
          type="text"
          name="title"
          value={newNewsItem.title}
          onChange={handleInputChange}
          placeholder="Título"
          required
        />
        <input
          type="date"
          name="publishDate"
          value={newNewsItem.publishDate}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Añadir Noticia</button>
      </form>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
            <span> - {item.publishDate}</span>
            <button onClick={() => handleDeleteNews(item.id)}>Eliminar</button>
            <button onClick={() => handleToggleEstado(item.id)}>
              {item.estado === 1 ? 'Desactivar' : 'Activar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsManager;