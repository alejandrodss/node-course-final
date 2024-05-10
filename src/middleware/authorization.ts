import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { CurrentUser } from '../types';

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const currentUser : CurrentUser = req.user;

  if(currentUser.role !== 'admin') {
    return res.status(403).send({
        "data": null,
        "error": {
          "message": "You must be authorized user"
        }
      });
  }
}
