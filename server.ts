import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express server
const app = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const commonEngine = new CommonEngine();

app.set('view engine', 'html');
app.set('views', browserDistFolder);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Serve static files from /browser (files with extensions)
app.use(express.static(browserDistFolder, {
  maxAge: '1y'
}));

// All regular routes use the Angular engine
app.get('*', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html: string) => res.send(html))
    .catch((err: any) => next(err));
});

export default app;