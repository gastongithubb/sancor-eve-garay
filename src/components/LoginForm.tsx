import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const ModernLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen font-SpaceGrotesk">
      <div className="w-full max-w-md p-6 m-4 space-y-6 rounded-lg bg-zinc-800 shadow-card">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Iniciar Sesión</h2>
          <p className="mt-2 text-sm text-zinc-400 sm:text-base">Bienvenido de vuelta</p>
        </div>
        <form className="space-y-4 sm:space-y-6">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 rounded text-lime border-zinc-600 focus:ring-lime"
              />
              <label htmlFor="remember-me" className="block ml-2 text-xs text-zinc-300 sm:text-sm">
                Recordarme
              </label>
            </div>
            <div className="text-xs sm:text-sm">
              <a href="#" className="font-medium text-lime hover:text-white">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-lime hover:bg-white hover:text-lime focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <p className="text-xs text-center text-zinc-400 sm:text-sm">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="font-medium text-lime hover:text-white">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default ModernLogin;