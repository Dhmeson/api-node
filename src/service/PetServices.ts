import { PrismaClient } from '@prisma/client';
import { DatabaseQuery } from '../interfaces/DatabaseQuery';
import { ERROR_PET_DATABASE } from '../types/errors';
import { PetInput, PetOutput, PetUpdateInput } from '../types/pet.types';
const SELECT_OUTPUT_PRISMA = {
  age: true,
  allergies: true,
  birthDate: true,
  height: true,
  id: true,
  name: true,
  specie: true,
  weight: true,
};

export class PetServices implements DatabaseQuery {
  prisma = new PrismaClient();

  async create(data: PetInput): Promise<PetOutput> {
    const { age, birthDate, height, name, ownerId, weight, allergies, specie } =
      data;
    try {
      return await this.prisma.pet.create({
        data: {
          birthDate,
          height,
          name,
          weight,
          allergies,
          ownerId,
          specie,
          age,
        },
        select: SELECT_OUTPUT_PRISMA,
      });
    } catch (err) {
      throw new Error(ERROR_PET_DATABASE);
    }
  }
  async update(id: number, data: PetUpdateInput): Promise<PetOutput> {
    try {
      return await this.prisma.pet.update({
        where: { id },
        data,
        select: SELECT_OUTPUT_PRISMA,
      });
    } catch (error) {
      throw new Error(ERROR_PET_DATABASE);
    }
  }
  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.prisma.pet.delete({
        where: {
          id,
        },
      });
      if (result) return true;
      else return false;
    } catch (error) {
      throw new Error(ERROR_PET_DATABASE);
    }
  }
  async find(): Promise<PetOutput[] | []> {
    try {
      return await this.prisma.pet.findMany({});
    } catch (error) {
      return [];
    }
  }
  async findById(id: number): Promise<PetOutput> {
    try {
      return await this.prisma.pet.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(ERROR_PET_DATABASE);
    }
  }
}
