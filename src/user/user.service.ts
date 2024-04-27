import {IUser} from "../schemas/IUser";
import { UserBase, User } from "../types";

export class UserService {
  userRepository : UserBase;
  constructor(userRepository: UserBase) {
    this.userRepository = userRepository;
  }

  async getUser(id: string): Promise<IUser | User> {
    return (await this.userRepository.getUser(id));
  }
}