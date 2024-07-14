import app from './src/server';

async function startServer() {
  try {
    // Usamos 'any' para evitar el error de TypeScript
    const entryModule = await import('./dist/server/entry.mjs') as any;
    const { handler } = entryModule;
    
    if (typeof handler !== 'function') {
      throw new Error('Handler is not a function');
    }

    app.use(handler);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;