import express, { NextFunction, Response, Request, Router } from 'express';
import { UserService } from './user.service';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import { NoValidCredentialsError } from '../exceptions/NoValidCredentialsError';
import { verifyToken } from '../middleware/auth';
import { isAdmin } from '../middleware/authorization';

const UserController = (userService: UserService) : Router => {
  const usersRouter: Router = express.Router();

  const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
  });

  const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
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

    const validateLoginUserBody = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginUserSchema.validateAsync(req.body);
      next();
    } catch (err) {
      console.log("logging there", err)
      res.status(400).send({
        "data": null,
        "error": {
          "message": "Email or password are required"
        }
      });
    }
  };

  usersRouter.get('/:userId', verifyToken, isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try{
      const user = await userService.getUser(userId);
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
    const { email, password, role } = req.body;
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
        return;
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await userService.createUser({
        email: email,
        role: role,
        password: encryptedPassword
      });
      res.status(200).send(
        {
          "data": {
            "id": newUser.id,
            "email": newUser.email,
            "role": newUser.role
          },
          "error": null
        }
      )
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
  });

  usersRouter.post('/login', validateLoginUserBody, async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const token = await userService.loginUser({email, password});
      res.status(200)
      .send(
        {
          "data": {
            "token": token
          },
          "error": null
        }
      )
    } catch(error) {
      if(error instanceof NoValidCredentialsError) {
        res.status(error.status)
        .send({
          "data": null,
          "error": {
            "message": error.message
          }
        });
        return;
      }
      res.status(500)
      .send({
        "data": null,
        "error": {
          "message": "Internal Server error"
        }
      });
    }
  });
  return usersRouter;
};

export default UserController;
