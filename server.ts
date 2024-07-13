import express, { type Request, type Response } from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4321;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  `http://localhost:${port}/auth/google/callback`
);

app.get('/auth/google', (req: Request, res: Response) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    // Aquí puedes usar los tokens para obtener información del usuario desde Google
    // y luego registrar o iniciar sesión al usuario en tu aplicación
    res.send('Inicio de sesión exitoso con Google.');
  } catch (error) {
    console.error('Error al obtener tokens de acceso:', error);
    res.status(500).send('Error al iniciar sesión con Google.');
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
