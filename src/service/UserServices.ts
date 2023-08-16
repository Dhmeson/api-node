import { PrismaClient } from '@prisma/client'
import { Address } from '../entity/Address'
import { User } from '../entity/User'
import { DatabaseQuery } from '../interfaces/DatabaseQuery'
import { ERROR_MESSAGE_DATABASE } from '../types/errors'
import { CreateUserInput, UserOutput, UserUpdateInput } from '../types/user'
import { UpdateUser } from '../useCase/UpdateUser'
const SELECT_OUTPUT_PRISMA = {
	email: true,
	name: true,
	id: true,
	uid: true,
	address: true
}
export class UserServices implements DatabaseQuery {
	prisma = new PrismaClient()
	async create(data: CreateUserInput) {
		try {
			return await this.prisma.user.create({
				data: {
					email: data.email,
					name: data.name,
					uid: data.uid,
					address: {
						create: {
							street: data.address?.street ?? '',
							city: data.address?.city ?? '',
							state: data.address?.state ?? '',
							postalCode: data.address?.postalCode ?? ''
						}
					}
				}
			})
		} catch (err) {
			console.log(err)
			throw new Error(ERROR_MESSAGE_DATABASE)
		}
	}
	async update(id: number, data: UserUpdateInput) {
		try {
			const { email, name, uid } =
				await this.prisma.user.findUniqueOrThrow({
					where: {
						id
					}
				})
			const user = new User(name, email, uid, id, null)
			UpdateUser(user, data)

			return await this.prisma.user.update({
				where: {
					id
				},
				data: {
					email: user.getEmail(),
					name: user.getName(),
					uid: user.getuid()
					//address:{ connect: { id: data.addressId } }
				},
				select: SELECT_OUTPUT_PRISMA
			})
		} catch (error) {
			throw new Error(ERROR_MESSAGE_DATABASE)
		}
	}
	async delete(id: number): Promise<boolean> {
		const response = await this.prisma.user.delete({
			where: {
				id
			},
			include: {
				address: true
			}
		})
		//substituir pelo service do address
		await this.prisma.address.deleteMany({
			where: {
				User: {
					every: { id }
				}
			}
		})
		if (!response) throw new Error(ERROR_MESSAGE_DATABASE)
		return true
	}
	async find(): Promise<UserOutput[] | null> {
		try {
			const users: UserOutput[] = await this.prisma.user.findMany({
				select: SELECT_OUTPUT_PRISMA
			})
			return users
		} catch (error) {
			return null
		}
	}
	async findById(id: number): Promise<UserOutput> {
		try {
			return await this.prisma.user.findUniqueOrThrow({
				where: {
					id
				},
				select: SELECT_OUTPUT_PRISMA
			})
		} catch (error) {
			throw new Error(ERROR_MESSAGE_DATABASE)
		}
	}
}
