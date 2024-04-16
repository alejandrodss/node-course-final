import { UserBase, User } from "../types";

export class UserService {
  userRepository : UserBase;
  constructor(userRepository: UserBase) {
    this.userRepository = userRepository;
  }

  getUser(id: string): User {
    return (this.userRepository.getUser(id) as User);
  }
}