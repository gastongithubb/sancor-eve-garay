import { v as verifyUser } from './db-users_BKzhQi4_.mjs';

const post = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await verifyUser(email, password);
    return new Response(JSON.stringify({
      message: "Inicio de sesión exitoso",
      user,
      redirectUrl: "/"
      // Asegúrate de que esta URL sea correcta
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    if (error instanceof Error) {
      if (error.message === "Credenciales inválidas") {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 401,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export { post };
