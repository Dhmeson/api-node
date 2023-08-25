import { Request, Response } from 'express';
import { ZodParseError } from '../utils/ZodParseError';
import { ERROR_MESSAGE_DB_ADDRESS } from '../types/errors';
import { Controller } from '../interfaces/Controller';
import { validInpuId } from '../types/utils';
import { PetServices } from '../service/PetServices';
import {
  PetInput,
  PetUpdateInput,
  petSchema,
  petUpdateSchema,
} from '../types/pet.types';
const petServices = new PetServices();
export class PetController implements Controller {
  async find(req: Request, res: Response) {
    const pet = await petServices.find();
    res.send(pet);
  }
  async create(req: Request, res: Response) {
    try {
      const pet: PetInput = petSchema.parse(req.body);
      petServices
        .create(pet)
        .then(() => res.send(pet))
        .catch(() => {
          res.status(500).send({ error: ERROR_MESSAGE_DB_ADDRESS });
        });
    } catch (error) {
      ZodParseError(error, res);
    }
  }
  update(req: Request, res: Response) {
    try {
      const id = validInpuId.parse(Number(req.params.id));
      const data: PetUpdateInput = petUpdateSchema.parse(req.body);
      petServices
        .update(id, data)
        .then((response) => res.status(200).send(response))
        .catch(() => {
          res.status(500).send(ERROR_MESSAGE_DB_ADDRESS);
        });
    } catch (error) {
      ZodParseError(error, res);
    }
  }
  delete(req: Request, res: Response) {
    try {
      const id = validInpuId.parse(Number(req.params.id));
      petServices
        .delete(id)
        .then((result) => {
          result
            ? res.status(200).send('ok')
            : res.status(400).send('error inesperado');
        })
        .catch(() => res.status(500).send({ error: ERROR_MESSAGE_DB_ADDRESS }));
    } catch (error) {
      ZodParseError(error, res);
    }
  }

  findById(req: Request, res: Response) {
    try {
      const id = validInpuId.parse(Number(req.params.id));

      petServices
        .findById(id)
        .then((pet) => res.status(200).send(pet))
        .catch(() => res.status(500).send(ERROR_MESSAGE_DB_ADDRESS));
    } catch (error) {
      ZodParseError(error, res);
    }
  }
}
