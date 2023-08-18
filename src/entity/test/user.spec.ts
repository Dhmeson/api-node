import { ERROR_EMAIL_FORMAT } from '../../types/errors';
import { User } from '../User';
const address = null;

const INPUT_USER = {
  email: 'dhmeson@gmail.com',
  name: 'dh',
  uid: '123456',
  id: 1,
  address,
};
describe('Testar a entidade User', () => {
  it('deve criar um usuario', () => {
    const user = new User(
      INPUT_USER.name,
      INPUT_USER.email,
      INPUT_USER.uid,
      INPUT_USER.id,
      INPUT_USER.address
    );

    expect(user.getEmail()).toEqual(INPUT_USER.email);
    expect(user.getName()).toEqual(INPUT_USER.name);
    expect(user.getuid()).toEqual(INPUT_USER.uid);
    expect(user.getId()).toEqual(INPUT_USER.id);
  });
  it('deve ocorrer um erro ao criar o usuario com email invalido', () => {
    const createInvalidUser = () => {
      return new User(
        INPUT_USER.name,
        'dh',
        INPUT_USER.uid,
        INPUT_USER.id,
        null
      );
    };
    expect(createInvalidUser).toThrowError(ERROR_EMAIL_FORMAT);
  });
});
