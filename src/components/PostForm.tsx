import React, { useState } from 'react';

type PostFormProps = {
  onSubmit: (title: string, content: string) => void;
};

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 rounded-lg bg-zinc-100">
      <div>
        <label htmlFor="title" className="block mb-2 text-black">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded border-zinc-300"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block mb-2 text-black">Contenido</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded border-zinc-300"
          rows={4}
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 text-white rounded bg-lime hover:bg-opacity-90">
        Publicar
      </button>
    </form>
  );
};

export default PostForm;