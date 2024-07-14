import type { APIRoute } from 'astro';
import { google } from 'googleapis';

export const get: APIRoute = async ({ redirect }) => {
  const oauth2Client = new google.auth.OAuth2(
    import.meta.env.GOOGLE_CLIENT_ID,
    import.meta.env.GOOGLE_CLIENT_SECRET,
    `http://localhost:4321/auth/google/callback`
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });

  return redirect(authUrl);
};