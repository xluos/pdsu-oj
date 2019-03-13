import { provide } from 'midway';
import { IUser } from "../interface";
import { prisma } from '../model/generated/prisma-client';
@provide('userService')
export class UserService {



  async createUser(options: IUser): Promise<IUser> {
    return prisma.createUser({
      userId: options.userId,
      name: options.name,
      password: options.password
    })
  }
}
