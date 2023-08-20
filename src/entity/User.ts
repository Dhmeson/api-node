import { UserUpdateInput, emailValidator } from '../types/user';
import { Address } from './Address';
import { ERROR_EMAIL_FORMAT } from '../types/errors';
type UserProps = {
  name: string;
  email: string;
  uid: string;
  id?: number;
  address: Address | null;
};
export class User {
  private name: string;
  private email: string;
  private uid: string;
  private id: number;
  private address: Address | null;
  constructor(data: UserProps) {
    const { address, email, name, uid, id } = data;
    this.validator(email);
    this.email = email;
    this.name = name;
    this.id = id ?? 100;
    this.uid = uid;
    this.address = address;
  }
  validator(email: string) {
    try {
      emailValidator.parse(email);
    } catch (error) {
      throw new Error(ERROR_EMAIL_FORMAT);
    }
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getUid() {
    return this.uid;
  }
  getAddress() {
    return this.address;
  }

  update(data: UserUpdateInput) {
    this.email = data.email;
    this.name = data.name;
    this.uid = data.uid ?? this.uid;
  }
}
