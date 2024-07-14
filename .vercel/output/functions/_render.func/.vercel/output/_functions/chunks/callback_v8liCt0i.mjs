import { google } from 'googleapis';

const get = async ({ request, redirect }) => {
  const oauth2Client = new google.auth.OAuth2(
    "937366145803-0mt1d38qujv81s04qqst1etm917i5gms.apps.googleusercontent.com",
    "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",
    `http://localhost:4321/auth/google/callback`
  );
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("No se proporcionó código de autorización.", { status: 400 });
  }
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    return redirect(`/profile?name=${data.name}&email=${data.email}`);
  } catch (error) {
    console.error("Error al obtener tokens de acceso:", error);
    return new Response("Error al iniciar sesión con Google.", { status: 500 });
  }
};

export { get };
