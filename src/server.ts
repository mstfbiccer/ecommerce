import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Cache for FakeStore API responses to improve SSR performance
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * API proxy for FakeStore API with caching
 */
app.get('/api/products', async (req, res): Promise<void> => {
  const cacheKey = 'products';
  const cached = apiCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(cached.data);
    return;
  }

  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    
    apiCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/categories', async (req, res): Promise<void> => {
  const cacheKey = 'categories';
  const cached = apiCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(cached.data);
    return;
  }

  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const data = await response.json();
    
    apiCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/products/:id', async (req, res): Promise<void> => {
  const { id } = req.params;
  const cacheKey = `product-${id}`;
  const cached = apiCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(cached.data);
    return;
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    
    apiCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json(data);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
