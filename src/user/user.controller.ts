import express, { Express, Router } from 'express';
import { UserBase } from '../types';
import { UserService } from './user.service';
export class UserController {
  app: Express;
  usersRouter: Router;
  userRepository: UserBase;
  userService: UserService;

  constructor(app: Express, userRepository: UserBase) {
    this.app = app;
    this.usersRouter = express.Router();
    this.userRepository = userRepository;
    this.userService = new UserService(userRepository);
  }

  userRoutes() : Router {
    this.usersRouter.get('/:userId', (req, res, next) => {
      const userId = req.params.userId;
      try{
        const user = this.userService.getUser(userId);
        res
        .status(200).
        send(JSON.stringify(user));

      } catch (error) {
        throw error;
      }
    });
    return this.usersRouter;
  }
}