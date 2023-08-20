import { Address } from '../../entity/Address';
import { AddressServices } from '../AddressServices';
const INPUT_ADDRESS = {
  state: 'Rio Grande do Sul',
  city: 'POA',
  postalCode: '91140-504',
  street: 'rua',
};
const addressService = new AddressServices();

describe('Test address services', () => {
  it('create address', async () => {
    const address = new Address(INPUT_ADDRESS);
    const resultQuery = await addressService.create(address);
    expect(resultQuery.street).toEqual('rua');
    expect(resultQuery.city).toEqual('POA');
    expect(resultQuery.state).toEqual('Rio Grande do Sul');
    expect(resultQuery.postalCode).toEqual('91140-504');
  });
});
