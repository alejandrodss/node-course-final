import { PostUser, User, UserBase } from '../types';
import { EntityRepository } from '@mikro-orm/core';
import { User as UserEntity} from '../entities/user';
import { DatabaseError } from '../exceptions/DatabaseError';

export class UserRepository implements UserBase {
  userRepository: EntityRepository<UserEntity>;

  constructor(repository: EntityRepository<UserEntity>) {
    this.userRepository = repository;
  }

  async getUser(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ id: id });
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

  async getUserByEmail(email: string) : Promise<UserEntity | null> {
    try {
      return await this.userRepository.findOne({ email: email });
    } catch (err) {
      throw new DatabaseError(`Error fetching user with email ${email}`);
    }
  }

  async listUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (err) {
      throw new Error(`There was an error fetching users ${err}`)
    }
  }

  async createUser(user: PostUser): Promise<UserEntity> {
    try {
      const newUser = new UserEntity(
        user.password,
        user.email,
        user.role
      );

      await this.userRepository.getEntityManager().persistAndFlush(newUser);
      console.log("User created: ", newUser);
      return newUser;
    } catch (err) {
      throw new Error(`There was an error creating the user ${err}`);
    }
  }

  async updateUser(id: string) : Promise<void> {
    try {
      const user = await this.userRepository.findOne({id});
      if(user !== null) {
        user.email = "john.doe@example.com";
        await this.userRepository.upsert(user);
        console.log("Update result: ", user);
      }
    } catch (err) {
      throw new Error(`There was an error updating the user ${err}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ id });
      if (user !== null) {
        const result = await this.userRepository.getEntityManager().removeAndFlush(user);
        console.log("Delete result: ", result);
      }
    } catch (err) {
      throw new Error(`There was an error deleting the user ${err}`);
    }
  }
}
