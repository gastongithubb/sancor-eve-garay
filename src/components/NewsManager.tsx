import React, { useState, useEffect } from 'react';
import { getNews, addNews, deleteNews, updateNews, type NovedadesRow, toggleEstadoNoticia } from './lib/db';

type EstadoNoticia = 'vigente' | 'actualizada' | 'caducada';

const NewsManager: React.FC = () => {
  const [news, setNews] = useState<NovedadesRow[]>([]);
  const [filteredNews, setFilteredNews] = useState<NovedadesRow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNewsItem, setNewNewsItem] = useState<Omit<NovedadesRow, 'id' | 'nueva_columna'>>({
    url: '',
    title: '',
    publishDate: '',
    estado: 'vigente',
  });
  const [editingNews, setEditingNews] = useState<NovedadesRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const filtered = news.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchTerm, news]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const newsData = await getNews();
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Error al cargar las noticias. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const validateNewsItem = (item: Omit<NovedadesRow, 'id' | 'nueva_columna'>): boolean => {
    if (!item.url.trim() || !item.title.trim() || !item.publishDate.trim()) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateNewsItem(newNewsItem)) return;

    try {
      await addNews({ ...newNewsItem, nueva_columna: null });
      fetchNews();
      setNewNewsItem({ url: '', title: '', publishDate: '', estado: 'vigente' });
    } catch (error) {
      console.error('Error adding news:', error);
      setError('Error al añadir la noticia. Por favor, intenta de nuevo.');
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      await deleteNews(id);
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
      setError('Error al eliminar la noticia. Por favor, intenta de nuevo.');
    }
  };

  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews && validateNewsItem(editingNews)) {
      try {
        await updateNews(editingNews.id, editingNews);
        fetchNews();
        setEditingNews(null);
      } catch (error) {
        console.error('Error updating news:', error);
        setError('Error al actualizar la noticia. Por favor, intenta de nuevo.');
      }
    }
  };

  const toggleEstadoNoticiaHandler = async (id: number, estado: EstadoNoticia) => {
    try {
      await toggleEstadoNoticia(id, estado);
      fetchNews();
    } catch (error) {
      console.error('Error updating estado:', error);
      setError('Error al actualizar el estado de la noticia. Por favor, intenta de nuevo.');
    }
  };

  const renderSkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-4 bg-white border rounded-lg shadow-card border-zinc-300">
          <div className="w-3/4 h-6 mb-2 rounded bg-zinc-600 animate-pulse"></div>
          <div className="w-full h-5 mb-2 rounded bg-zinc-600 animate-pulse"></div>
          <div className="w-1/3 h-5 mb-4 rounded bg-zinc-600 animate-pulse"></div>
          <div className="flex">
            <div className="w-20 mr-2 rounded bg-zinc-600 h-9 animate-pulse"></div>
            <div className="w-20 rounded bg-zinc-600 h-9 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container p-4 mx-auto font-SpaceGrotesk">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-black">Gestor de Noticias</h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 pr-4 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime"
          />
          <svg
            className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-zinc-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {error && <div className="p-2 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

      <form onSubmit={handleAddNews} className="mb-4">
        <input
          type="text"
          placeholder="URL"
          value={newNewsItem.url}
          onChange={(e) => setNewNewsItem({ ...newNewsItem, url: e.target.value })}
          className="p-2 mr-2 border rounded-lg border-zinc-600 focus:outline-none focus:border-lime"
          required
        />
        <input
          type="text"
          placeholder="Título"
          value={newNewsItem.title}
          onChange={(e) => setNewNewsItem({ ...newNewsItem, title: e.target.value })}
          className="p-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime"
          required
        />
        <input
          type="date"
          value={newNewsItem.publishDate}
          onChange={(e) => setNewNewsItem({ ...newNewsItem, publishDate: e.target.value })}
          className="p-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime"
          required
        />
        <button type="submit" className="p-2 text-white transition duration-300 bg-black rounded-lg hover:bg-lime">Añadir Noticia</button>
      </form>

      {loading ? (
        renderSkeletonLoader()
      ) : (
        <div className="space-y-4">
          {filteredNews.map((item) => (
            <div key={item.id} className="relative p-4 bg-white border rounded-lg shadow-card border-zinc-300">
              <select
                value={item.estado}
                onChange={(e) => toggleEstadoNoticiaHandler(item.id, e.target.value as EstadoNoticia)}
                className="absolute p-2 bg-white border rounded-lg shadow-lg top-2 right-2 focus:outline-none"
              >
                <option value="vigente">Vigente</option>
                <option value="actualizada">Actualizada</option>
                <option value="caducada">Caducada</option>
              </select>

              {editingNews && editingNews.id === item.id ? (
                <form onSubmit={handleUpdateNews}>
                  <input
                    type="text"
                    value={editingNews.url}
                    onChange={(e) => setEditingNews({ ...editingNews, url: e.target.value })}
                    className="p-2 mb-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime"
                    required
                  />
                  <input
                    type="text"
                    value={editingNews.title}
                    onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                    className="p-2 mb-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime"
                    required
                  />
                  <input
                    type="date"
                    value={editingNews.publishDate}
                    onChange={(e) => setEditingNews({ ...editingNews, publishDate: e.target.value })}
                    className="p-2 mb-2 mr-2 border rounded-lg border-zinc-300 focus:outline-none focus:border-lime"
                    required
                  />
                  <button type="submit" className="p-2 mr-2 text-white transition duration-300 bg-black rounded-lg hover:bg-lime">Guardar</button>
                  <button onClick={() => setEditingNews(null)} className="p-2 text-white transition duration-300 bg-black rounded-lg hover:bg-lime">Cancelar</button>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-black">{item.title}</h2>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime hover:underline"
                  >
                    {item.url}
                  </a>
                  <p className="mt-2 text-zinc-600">Publicado el {new Date(item.publishDate).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-sm font-semibold rounded ${getStateColorClass(item.estado)} mr-2`}>{getStateLabel(item.estado)}</span>
                    <button onClick={() => setEditingNews(item)} className="p-2 text-black transition duration-300 rounded-lg bg-zinc-200 hover:bg-zinc-300">Editar</button>
                    <button onClick={() => handleDeleteNews(item.id)} className="p-2 ml-2 text-black transition duration-300 rounded-lg bg-red hover:bg-[#e85569]">Eliminar</button>
                    {/* {item.estado !== 'vigente' && (
                      <button onClick={() => toggleEstadoNoticiaHandler(item.id, 'vigente')} className="p-2 ml-2 text-[#000] transition duration-300 rounded-lg bg-green hover:bg-[#73d685]">Marcar como Vigente</button>
                    )}
                    {item.estado !== 'actualizada' && (
                      <button onClick={() => toggleEstadoNoticiaHandler(item.id, 'actualizada')} className="p-2 ml-2 text-[#000] transition duration-300 rounded-lg bg-yellow hover:bg-[#eac84d]">Marcar como Actualizada</button>
                    )}
                    {item.estado !== 'caducada' && (
                      <button onClick={() => toggleEstadoNoticiaHandler(item.id, 'caducada')} className="p-2 ml-2 text-[#000] transition duration-300 bg-red rounded-lg hover:bg-[#e85569]">Marcar como Caducada</button>
                    )} */}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getStateLabel = (estado: EstadoNoticia): string => {
  switch (estado) {
    case 'vigente':
      return 'Vigente';
    case 'actualizada':
      return 'Actualizada';
    case 'caducada':
      return 'Caducada';
    default:
      return '';
  }
};

const getStateColorClass = (estado: EstadoNoticia): string => {
  switch (estado) {
    case 'vigente':
      return 'bg-green text-black px-2 py-1 rounded-lg text-lg';
    case 'actualizada':
      return 'bg-yellow text-black px-2 py-1 rounded-lg text-lg';
    case 'caducada':
      return 'bg-red text-black px-2 py-1 rounded-lg text-lg';
    default:
      return '';
  }
};

export default NewsManager;
