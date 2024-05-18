import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { CurrentUser } from '../types';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).send({
      "data": null,
      "error": {
        "message": "User is not authorized"
      }
    });
  }

  const [tokenType, token] = authHeader.split(' ');

  if(tokenType !== 'Bearer') {
    return res.status(401).send({
      "data": null,
      "error": {
        "message": "User is not authorized"
      }
    });
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as CurrentUser;
    req.user = user;
  } catch (error) {
    return res.status(403).send({
        "data": null,
        "error": {
          "message": "You must be authorized user"
        }
      });
  }
  return next();
}
