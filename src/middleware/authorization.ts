import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { CurrentUser } from '../types';

type Options = {
  shouldValidateUser?: boolean;
};

export function isAdmin({ shouldValidateUser }: Options = {}) {
  return async(req: Request, res: Response, next: NextFunction) => {
    const currentUser : CurrentUser = req.user;

    if(currentUser.role !== 'admin') {
      return res.status(403).send({
          "data": null,
          "error": {
            "message": "You must be authorized user"
          }
        });
    }

    if(shouldValidateUser && !req.get('x-user-id')) {
      return res.status(400)
        .send({
          "data": null,
          "error": {
            "message": "x-user-id header is missing, unable to complete the request"
          }
        });
    }
    next();
  }
}
