import { addressSchema } from '../../types/address';
import { CepPromise } from '../CepPromise';

describe('Testar a busca de endereço pelo cep', () => {
  it('Buscar endereço completo', async () => {
    const cep = new CepPromise();
    const result = await cep.find('91140504');
    try {
      const address = addressSchema.parse(result);
      expect(address.city).toEqual('Porto Alegre');
      expect(address.state).toEqual('RS');
    } catch (error) {
      throw new Error();
    }
  });
  it('Deve retornar error ao enviar cep invalido', async () => {
    const cep = new CepPromise();
    let isInvalidAddress = false;
    try {
      await cep.find('91111111111111');
    } catch (error) {
      isInvalidAddress = true;
    }
    expect(isInvalidAddress).toBeTruthy();
  });
});
