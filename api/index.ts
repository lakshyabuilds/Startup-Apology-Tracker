import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  try {
    const serverModule = await import('../server');
    const app = await serverModule.default;
    app(req, res);
  } catch (err: any) {
    console.error("Initialization error:", err);
    res.status(500).send(`Server initialization error: ${err.message}\n${err.stack}`);
  }
}

