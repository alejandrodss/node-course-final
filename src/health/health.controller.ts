import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import express, { NextFunction, Response, Request, Router } from 'express';

const HealthController = (orm: MikroORM<IDatabaseDriver<Connection>>) : Router => {
  const healthRouter: Router = express.Router();

  healthRouter.get('/', async (req, res, next: NextFunction) => {
    if((await orm.checkConnection()).ok) {
      return res.status(200).send({
        "data": {
          "status": "up"
        },
        "error": null
      });
    }
    return res.status(500).send({
      "data": null,
      "error": {
        "message": "Internal Server error"
      }
    });
  });

  return healthRouter;
}

export default HealthController;
