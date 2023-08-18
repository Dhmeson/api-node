import { PrismaClient } from '@prisma/client';
import { DatabaseQuery } from '../interfaces/DatabaseQuery';
import {
  AddressInput,
  AddressOutput,
  AddressUpdateInput,
} from '../types/address';

export class AddressServices implements DatabaseQuery {
  prisma = new PrismaClient();
  async create(data: AddressInput): Promise<AddressOutput> {
    return this.prisma.address.create({
      data,
    });
  }
  async update(id: number, data: AddressUpdateInput): Promise<AddressOutput> {
    return this.prisma.address.update({
      where: {
        id,
      },
      data,
    });
  }
  async delete(id: number): Promise<AddressOutput> {
    return this.prisma.address.delete({
      where: {
        id,
      },
    });
  }
  async find(): Promise<AddressOutput[]> {
    return this.prisma.address.findMany();
  }
  async findById(id: number): Promise<AddressOutput> {
    return this.prisma.address.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
