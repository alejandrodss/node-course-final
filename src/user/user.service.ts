import {IUser} from "../schemas/IUser";
import { UserBase, User } from "../types";
import { User as UserEntity } from "../entities/user";

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
}