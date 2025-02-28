import express, { Express, NextFunction, Request, Response } from "express";

const app:Express = express();
const PORT = 3000;

app.get('/data', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'public, max-age=200, must-revalidate');
  res.json({ message: 'This is cached data', timestamp: new Date() });
});

app.get('/no-cache', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.json({ message: 'This is always fresh data', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

