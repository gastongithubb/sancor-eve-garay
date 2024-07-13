import type { APIRoute } from 'astro';
import { verifyUser } from '../../components/lib/db/db-users';

export const post: APIRoute = async ({ request }) => {
  try {
    if (request.headers.get("Content-Type") !== "application/json") {
      return new Response(JSON.stringify({ message: "Content-Type must be application/json" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and password are required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = await verifyUser(email, password);
    
    if (!user) {
      return new Response(JSON.stringify({ message: 'Credenciales inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      message: 'Inicio de sesión exitoso', 
      user,
      redirectUrl: '/'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);

    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};