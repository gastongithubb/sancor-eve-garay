<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 3120d25e780996749973811d25100fece0580884

const LoginForm = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="w-full max-w-md p-6 m-4 space-y-6 rounded-lg bg-zinc-800 shadow-card">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-lime sm:text-3xl">Iniciar sesión con Google</h2>
          <p className="mt-2 text-sm text-zinc-400 sm:text-base">Accede a tu cuenta usando Google</p>
        </div>
        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 mt-2 text-sm font-medium text-white rounded-md bg-lime hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar sesión con Google
          </button>
        </div>
        <p className="text-xs text-center text-zinc-400 sm:text-sm">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="font-medium text-lime hover:text-white">
            Registrarse
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;