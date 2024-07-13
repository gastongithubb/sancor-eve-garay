import { google } from 'googleapis';

const get = async ({ redirect }) => {
  const oauth2Client = new google.auth.OAuth2(
    "937366145803-0mt1d38qujv81s04qqst1etm917i5gms.apps.googleusercontent.com",
    "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",
    `http://localhost:4321/auth/google/callback`
  );
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"]
  });
  return redirect(authUrl);
};

export { get };
