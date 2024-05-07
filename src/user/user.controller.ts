import express, { NextFunction, Response, Request, Router } from 'express';
import { UserService } from './user.service';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

const UserController = (userService: UserService) : Router => {
  const usersRouter: Router = express.Router();

  const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
  });

  const validateRegisterUserBody = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createUserSchema.validateAsync(req.body);
      next();
    } catch (err) {
      console.log("logging there", err)
      res.status(400).send({
        "data": null,
        "error": {
          "message": "Email is not valid"
        }
      });
    }
  };

  usersRouter.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    try{
      const user = userService.getUser(userId);
      res
      .status(200).
      send(JSON.stringify(user));

    } catch (error) {
      res.status(404)
      .send({
        "data": null,
        "error": {
          "message": "User doesn't exists"
        }
      });
    }
  });

  usersRouter.post('/register', validateRegisterUserBody, async (req, res, next) => {
    const email = req.params.email;
    try {
      const user = await userService.getUserByEmail(email);
      if(user) {
        res.status(400)
          .send({
            "data": null,
            "error": {
              "message": "Email is not valid"
            }
          });
      }
      const encryptedPassword = await bcrypt.hash(req.params.password, 10);
      const newUser = await userService;
    } catch(error) {
      console.log(error);
      res.status(500)
        .send({
          "data": null,
          "error": {
            "message": "Internal server error"
          }
        });
    }
  })
  return usersRouter;
};

export default UserController;
