import { States } from '../../types/address';
import { Address } from '../../entity/Address';
import { UserServices } from '../UserServices';
import { User } from '../../entity/User';
import { CreateUser } from '../../types/user';
interface user {
  id: number;
  email: string;
  name: string;
  uid: string;
  addressId: number | null;
}
const INPUT_ADDRESS = {
  state: 'Rio Grande do Sul',
  city: 'POA',
  postalCode: '91140-504',
  street: 'rua',
};
const address = new Address(INPUT_ADDRESS);
let USER_: user = {} as user;
const n = Math.random() * 100;
const INPUT_USER = {
  email: 'test' + n + '@gmail.com',
  name: 'test',
  uid: '123456',
  id: 1,
  address: null,
};
const userService = new UserServices();

describe('Testar a services do User', () => {
  it('deve salvar um  User', async () => {
    const { email, name, uid, address } = INPUT_USER;
    const user: CreateUser = { address, email, name, uid };

    const createdUser = await userService.create(user);
    expect(createdUser.name).toEqual(name);
    expect(createdUser.email).toEqual(email);
    expect(createdUser.uid).toEqual(uid);
    USER_ = createdUser;
  });
  it('update user', async () => {
    const newEmail = 'test123@gmail.com';
    const newName = 'test';
    const updatedUser = await userService.update(USER_.id, {
      name: newName,
      email: newEmail,
    });
    expect(updatedUser.email).toEqual(newEmail);
    expect(updatedUser.name).toEqual(newName);
  });
  it('deletar user', async () => {
    console.log(USER_.id);
    const resultQuery = await userService.delete(USER_.id);
    expect(resultQuery).toBeTruthy();
  });
});
