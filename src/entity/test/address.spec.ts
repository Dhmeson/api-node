import { States } from '../../types/address'
import { ERROR_ADDRESS_FORMAT } from '../../types/errors'
import { Address } from '../Address'
const INPUT_ADDRESS = {
	state: States.RS,
	city: 'POA',
	postalCode: '91140-504',
	street: 'rua'
}
describe('Testar a entidade Address', () => {
	it('deve criar um Address', () => {
		const address = new Address(
			INPUT_ADDRESS.street,
			INPUT_ADDRESS.city,
			States.RS,
			INPUT_ADDRESS.postalCode
		)

		expect(address.state).toEqual(INPUT_ADDRESS.state)
		expect(address.city).toEqual(INPUT_ADDRESS.city)
		expect(address.postalCode).toEqual(INPUT_ADDRESS.postalCode)
		expect(address.street).toEqual(INPUT_ADDRESS.street)
	})
	it('deve ocorrer um erro ao criar um address com postalCode invalido', () => {
		const createInvalidAddress = () => {
			return new Address(
				INPUT_ADDRESS.street,
				INPUT_ADDRESS.city,
				INPUT_ADDRESS.state,
				'11111'
			)
		}
		expect(createInvalidAddress).toThrowError(ERROR_ADDRESS_FORMAT)
	})
})
