import { PrismaClient } from '@prisma/client';
import { User } from '../entity/User';
import { DatabaseQuery } from '../interfaces/DatabaseQuery';
import { ERROR_MESSAGE_DATABASE } from '../types/errors';
import { CreateUser, UserOutput, UserUpdateInput } from '../types/user';
const SELECT_OUTPUT_PRISMA = {
  email: true,
  name: true,
  id: true,
  //uid: true,
  address: true,
  // addresId: true,
};

export class UserServices implements DatabaseQuery {
  prisma = new PrismaClient();

  async create(data: CreateUser) {
    const { address, email, name, uid } = data;

    try {
      return await this.prisma.user.create({
        data: {
          email,
          name,
          uid,
          address: {
            create: {
              street: address ? address.street : '',
              city: address ? address.city : '',
              state: address ? address.state : '',
              postalCode: address ? address.postalCode : '',
            },
          },
        },
      });
    } catch (err) {
      throw new Error(ERROR_MESSAGE_DATABASE);
    }
  }
  async update(id: number, data: UserUpdateInput) {
    try {
      const { email, name, uid } = await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
      const user = new User({ name, email, uid, id, address: null });
      user.update(data);

      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          email: user.getEmail(),
          name: user.getName(),
          uid: user.getUid(),
          //address:{ connect: { id: data.addressId } }
        },
        select: SELECT_OUTPUT_PRISMA,
      });
    } catch (error) {
      throw new Error(ERROR_MESSAGE_DATABASE);
    }
  }
  async delete(id: number): Promise<boolean> {
    await this.prisma.address.deleteMany({
      where: {
        User: {
          id: id,
        },
      },
    });
    const response = await this.prisma.user.delete({
      where: {
        id,
      },
      include: {
        address: true,
      },
    });

    if (!response) throw new Error(ERROR_MESSAGE_DATABASE);
    return true;
  }
  async find(): Promise<UserOutput[] | null> {
    try {
      const users: UserOutput[] = await this.prisma.user.findMany({
        select: SELECT_OUTPUT_PRISMA,
      });
      return users;
    } catch (error) {
      return null;
    }
  }
  async findById(id: number): Promise<UserOutput> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: {
          id,
        },

        select: SELECT_OUTPUT_PRISMA,
      });
    } catch (error) {
      throw new Error(ERROR_MESSAGE_DATABASE);
    }
  }
}
