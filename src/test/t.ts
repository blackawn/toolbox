import { fileURLToPath } from 'url';

export async function launchWebUI(options: WebUIOptions) {
  const serveStatic = (await import('serve-static')).default;
  const finalhandler = (await import('finalhandler')).default;
  const http = await import('http');

  const port = options.port ?? 6801;
  const clientDir = fileURLToPath(new URL('./client', import.meta.url));
  const serve = serveStatic(clientDir, { index: ['index.html'] });
  const server = http.createServer(async (req, res) => {
    serve(req, res, finalhandler(req, res));
  });

  server.listen(port);

  return server;
}

export interface WebUIOptions {
  port?: number;

  rpc: {
    port: number;

    secret: string | undefined;
  };
}

launchWebUI({
  rpc:{
    port: 6800,
    secret: ''
  }
})
