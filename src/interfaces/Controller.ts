import { Request, Response } from 'express';

export interface Controller {
  create: (req: Request, res: Response) => void;
  find: (req: Request, res: Response) => void;
  findById: (req: Request, res: Response) => void;
  delete: (req: Request, res: Response) => void;
  update: (req: Request, res: Response) => void;
}
