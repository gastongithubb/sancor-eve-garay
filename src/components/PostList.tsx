import React from 'react';
import { useState, useEffect } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
};

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Aquí normalmente harías una llamada a una API para obtener las publicaciones
    // Por ahora, usaremos datos de ejemplo
    const examplePosts: Post[] = [
      { id: 1, title: "Primera publicación", content: "Contenido de la primera publicación", date: "2024-07-13" },
      { id: 2, title: "Segunda publicación", content: "Contenido de la segunda publicación", date: "2024-07-14" },
    ];
    setPosts(examplePosts);
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white rounded-lg shadow-card">
          <h2 className="mb-2 text-xl font-bold text-black">{post.title}</h2>
          <p className="mb-2 text-zinc-800">{post.content}</p>
          <span className="text-sm text-zinc-500">{post.date}</span>
        </div>
      ))}
    </div>
  );
};

export default PostList;