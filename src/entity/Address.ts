import { States, postalCodeValidator } from '../types/address';
import { ERROR_ADDRESS_FORMAT } from '../types/errors';

export class Address {
  constructor(
    public street: string,
    public city: string,
    public state: States,
    public postalCode: string
  ) {
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
