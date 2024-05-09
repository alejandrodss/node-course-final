import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {IUser} from "../schemas/IUser";
import { UserBase, User, PostUser, LoginResponse } from "../types";
import { User as UserEntity } from "../entities/user";
import { NoValidCredentialsError } from '../exceptions/NoValidCredentialsError';

export class UserService {
  userRepository : UserBase;
  constructor(userRepository: UserBase) {
    this.userRepository = userRepository;
  }

  async getUser(id: string): Promise<IUser | User> {
    return (await this.userRepository.getUser(id));
  }

  async getUserByEmail(email: string): Promise<IUser | User | UserEntity | null> {
    return (await this.userRepository.getUserByEmail(email));
  }

  async createUser(user: PostUser) : Promise<User | IUser | UserEntity> {
    return (this.userRepository.createUser(user));
  }

  async loginUser(userData: {email: string, password: string}) : Promise<LoginResponse> {
    const user = await this.getUserByEmail(userData.email);
    if(user && (await bcrypt.compare(userData.password, user.password))) {
      const token = jwt.sign(
        {
          user_id: user.id, email: userData.email, role: user.role
        },
        process.env.TOKEN_KEY!,
        {
        expiresIn: "3h"
        }
      );
      return { token }
    }
    throw new NoValidCredentialsError();
  }
}