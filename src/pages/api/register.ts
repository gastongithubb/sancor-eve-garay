import type { APIRoute } from 'astro';
import { registerUser } from '../../components/lib/db/db-users';

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password, name } = body;
    const user = await registerUser(email, password, name);
    
    return new Response(JSON.stringify({ message: 'Usuario registrado exitosamente', user }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error en el registro:', error);

    if (error instanceof Error) {
      if (error.message === 'El correo electrónico ya está en uso') {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else if (error.message === 'No se pudo registrar el usuario') {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    }

    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};