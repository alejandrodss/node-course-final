import express, { Router } from 'express';
import { UserService } from './user.service';

const UserController = (userService: UserService) : Router => {
  const usersRouter: Router = express.Router();

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
