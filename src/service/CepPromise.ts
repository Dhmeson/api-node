import { PostalCode } from '../interfaces/PostalCode';
import { AddressInterface } from '../types/address';
import cep from 'cep-promise';

export class CepPromise implements PostalCode {
  async find(postalCode: number | string): Promise<AddressInterface> {
    return cep(postalCode)
      .then((address) => {
        return {
          city: address.city,
          state: address.state,
          street: address.street,
          postalCode: address.cep,
        };
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
