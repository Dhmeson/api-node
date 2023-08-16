import { Request, Response } from 'express'
import { ZodParseError } from '../utils/ZodParseError'
import {
	userIdInput,
	userInputSchema,
	userUpdateInputSchema
} from '../types/user'
import { UserServices } from '../service/UserServices'
import { ERROR_MESSAGE_DATABASE } from '../types/errors'
import { Controller } from '../interfaces/Controller'
const userService = new UserServices()
export class UserController implements Controller {
	async find(req: Request, res: Response) {
		const users = await userService.find()
		res.send(users)
	}
	async create(req: Request, res: Response) {
		try {
			const user = userInputSchema.parse(req.body)
			userService
				.create(user)
				.then(() => res.send(user))
				.catch(() => {
					res.status(500).send({ error: ERROR_MESSAGE_DATABASE })
				})
		} catch (error) {
			ZodParseError(error, res)
		}
	}
	update(req: Request, res: Response) {
		try {
			const id = userIdInput.parse(Number(req.params.id))
			const data = userUpdateInputSchema.parse(req.body)
			userService
				.update(id, data)
				.then((response) => res.status(200).send(response))
				.catch(() => {
					res.status(500).send(ERROR_MESSAGE_DATABASE)
				})
		} catch (error) {
			ZodParseError(error, res)
		}
	}
	delete(req: Request, res: Response) {
		try {
			const id = userIdInput.parse(Number(req.params.id))
			userService
				.delete(id)
				.then(() => res.status(200).send('ok'))
				.catch(() =>
					res.status(500).send({ error: ERROR_MESSAGE_DATABASE })
				)
		} catch (error) {
			ZodParseError(error, res)
		}
	}

	findById(req: Request, res: Response) {
		try {
			const id = userIdInput.parse(Number(req.params.id))

			userService
				.findById(id)
				.then((user) => res.status(200).send(user))
				.catch(() => res.status(500).send(ERROR_MESSAGE_DATABASE))
		} catch (error) {
			ZodParseError(error, res)
		}
	}
}
