import { PostalCode } from '../interfaces/PostalCode';
import { AddressInterface } from '../types/address';
import { PostalCodeError } from '../types/errors';
import cep from 'cep-promise';

export class CepPromise implements PostalCode {
  async find(
    postalCode: number | string
  ): Promise<AddressInterface | PostalCodeError> {
    return cep(postalCode)
      .then((address) => {
        return address;
      })
      .catch((error) => {
        return error;
      });
  }
}
