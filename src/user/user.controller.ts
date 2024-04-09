import express, { Express, Router } from 'express';
import { UserBase } from '../types';
import { UserService } from './user.service';

const UserController = (userRepository: UserBase) : Router => {
  const usersRouter: Router = express.Router();
  const userService: UserService = new UserService(userRepository);

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
  return usersRouter;
};

export default UserController;
