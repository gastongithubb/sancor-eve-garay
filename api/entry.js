import { handler as ssrHandler } from '../dist/server/entry.mjs';

export default async function handler(request, response) {
  await ssrHandler(request, response);
}