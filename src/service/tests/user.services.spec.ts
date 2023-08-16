import { States } from '../../types/address'
import { Address } from '../../entity/Address'
import { UserServices } from '../UserServices'
interface user {
	id: number
	email: string
	name: string
	uid: string
	addressId: number | null
}
const address = new Address('rua', 'Poa', States.RS, '91140-504')
let USER_: user = {} as user
const n = Math.random() * 100
const INPUT_USER = {
	email: 'dhmes' + n + '@gmail.com',
	name: 'dh',
	uid: '123456',
	id: 1,
	address
}
const userService = new UserServices()

describe('Testar a services do User', () => {
	it('deve salvar um no User', async () => {
		const { address, email, id, name, uid } = INPUT_USER
		const createdUser = await userService.create({
			id,
			name,
			email,
			uid,
			address
		})
		expect(createdUser.name).toEqual(name)
		expect(createdUser.email).toEqual(email)
		expect(createdUser.uid).toEqual(uid)
		USER_ = createdUser
	})
	it('update user', async () => {
		const newEmail = 'dh9999911122'
		const newName = 'hhgahhghgh'
		const updatedUser = await userService.update(USER_.id, {
			name: newName,
			email: newEmail
		})
		expect(updatedUser.email).toEqual(newEmail)
		expect(updatedUser.name).toEqual(newName)
	})
	it('deletar user', async () => {
		const resultQuery = await userService.delete(USER_.id)
		expect(resultQuery).toBeTruthy()
	})
})
