import { randomUUID } from 'node:crypto';
import MongoUser, { IUser } from '../schemas/IUser';
import { PostUser, User, UserBase } from '../types';

export class UserRepository implements UserBase {
  async getUser(id: string): Promise<IUser | User> {
    try {
      const user = await MongoUser.findOne({ id: id }).exec();
      console.log("User found: ", user);
      if(user !== null) {
        return ({
          id: user.id,
          email: user.email,
          password: user.password,
          role: user.role
        });
      } else {
        throw new Error(`User with id ${id} not found`);
      }
    } catch (err) {
      throw new Error(`User with id ${id} not found`);
    }
  }

  async listUsers(): Promise<IUser[]> {
    try {
      const users = await MongoUser.find();
      return users;
    } catch (err) {
      throw new Error(`There was an error fetching users ${err}`)
    }
  }

  async createUser(user: PostUser): Promise<void> {
    try {
      const newUser = new MongoUser({
        id: randomUUID(),
        email: user.email,
        password: user.password,
        role: 'user'
      });

      const savedUser = await newUser.save();
      console.log("User created: ", savedUser);
    } catch (err) {
      throw new Error(`There was an error creating the user ${err}`);
    }
  }

  async updateUser(id: string) : Promise<void> {
    try {
      const result = await MongoUser.updateOne(
        { email: "john.doe@example.com" },
        { name: "Jane Doe" }
      );
      console.log("Update result: ", result);
    } catch (err) {
      throw new Error(`There was an error updating the user ${err}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const result = await MongoUser.deleteOne({ id });
      console.log("Delete result: ", result);
    } catch (err) {
      throw new Error(`There was an error deleting the user ${err}`);
    }
  }
}
