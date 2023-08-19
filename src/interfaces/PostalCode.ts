import { AddressInterface } from '../types/address';
import { PostalCodeError } from '../types/errors';

export interface PostalCode {
  find: (
    postalCode: string | number
  ) => Promise<AddressInterface | PostalCodeError>;
}
