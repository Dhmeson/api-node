import { Request, Response } from 'express';
import { ZodParseError } from '../utils/ZodParseError';
import { ERROR_MESSAGE_DB_ADDRESS } from '../types/errors';
import { Controller } from '../interfaces/Controller';
import { AddressServices } from '../service/AddressServices';
import { addressSchema, addressUpdateSchema } from '../types/address';
import { validInpuId } from '../types/utils';
const addressServices = new AddressServices();
export class AddreessController implements Controller {
  async find(req: Request, res: Response) {
    const address = await addressServices.find();
    res.send(address);
  }
  async create(req: Request, res: Response) {
    try {
      const address = addressSchema.parse(req.body);
      addressServices
        .create(address)
        .then(() => res.send(address))
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
      const data = addressUpdateSchema.parse(req.body);
      addressServices
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
      addressServices
        .delete(id)
        .then(() => res.status(200).send('ok'))
        .catch(() => res.status(500).send({ error: ERROR_MESSAGE_DB_ADDRESS }));
    } catch (error) {
      ZodParseError(error, res);
    }
  }

  findById(req: Request, res: Response) {
    try {
      const id = validInpuId.parse(Number(req.params.id));

      addressServices
        .findById(id)
        .then((address) => res.status(200).send(address))
        .catch(() => res.status(500).send(ERROR_MESSAGE_DB_ADDRESS));
    } catch (error) {
      ZodParseError(error, res);
    }
  }
}
