import { postalCodeValidator } from '../types/address';
import { ERROR_ADDRESS_FORMAT } from '../types/errors';

type AddressProps = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};
export class Address {
  public street: string;
  public city: string;
  public state: string;
  public postalCode: string;
  constructor(data: AddressProps) {
    const { city, postalCode, state, street } = data;
    this.isValidPostalCode(postalCode);
    this.state = state;
    this.city = city;
    this.street = street;
    this.postalCode = postalCode;
  }
  isValidPostalCode(postalCode: string) {
    try {
      postalCodeValidator.parse(postalCode); // format 91140-504
    } catch (error) {
      throw new Error(ERROR_ADDRESS_FORMAT);
    }
  }
}
