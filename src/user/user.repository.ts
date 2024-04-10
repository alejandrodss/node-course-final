import { randomUUID } from "crypto";
import { UserBase, User, PostUser } from "../types";

export class UserRepository implements UserBase {
  users: User[];
  constructor(
    public initialUsers: User[]
  ) {
    this.users = initialUsers;
  }

  getUser(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if(user !== undefined) {
      return user;
    }
    throw new Error(`User with id ${id} not found`);
  }

  listUsers(): User[] {
      return this.users;
  }

  createUser(user: PostUser): void {
    let newUser: User = {
      ...user,
      id: randomUUID()
    }
    this.users.push(newUser);
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      const deletedUser = this.users.splice(userIndex, 1)[0];
    } else {
      throw new Error(`User with id ${id} doesn't exist`);
    }
  }
}