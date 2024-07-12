import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://sancor-eve-garay.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      const data = await response.json();

      // Guardar información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirigir a la página principal
      window.location.href = data.redirectUrl;

    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setError('Ocurrió un error durante el inicio de sesión');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-SpaceGrotesk">
      <div className="w-full max-w-md p-6 m-4 space-y-6 rounded-lg bg-zinc-800 shadow-card">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-zinc-400 sm:text-base">Accede a tu cuenta</p>
        </div>
        {error && (
          <div className="p-2 text-sm text-red-500 bg-red-100 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
              Correo electrónico
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-white border rounded-md placeholder-zinc-500 bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent"
                placeholder="tu@ejemplo.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
              Contraseña
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-white border rounded-md placeholder-zinc-500 bg-zinc-700 border-zinc-600 focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent"
                placeholder="********"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-zinc-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-zinc-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-lime hover:bg-white hover:text-lime focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
        <p className="text-xs text-center text-zinc-400 sm:text-sm">
          ¿No tienes una cuenta?{' '}
          <a href="/login" className="font-medium text-lime hover:text-white">
            Registrarse
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
