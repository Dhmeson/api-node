import { z } from 'zod'

const userBaseSchema = z.object({
	id: z.number(),
	name: z.string(),
	uid: z.string(),
	email: z.string().email(),
	address: z
		.object({
			street: z.string(),
			city: z.string(),
			state: z.string(),
			postalCode: z.string()
		})
		.nullable()
		.optional()
})
export const userInputSchema = userBaseSchema
export const userOutputSchema = userBaseSchema
const userUpdateOutputSchema = userBaseSchema

export const userUpdateInputSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	uid: z.string().min(6).optional(),
	address: z
		.object({
			street: z.string(),
			city: z.string(),
			state: z.string(),
			postalCode: z.string()
		})
		.nullable()
		.optional()
})
export const userIdInput = z.number().min(1)
export const emailValidator = z.string().email()
export type CreateUserInput = z.infer<typeof userInputSchema>
export type UserOutput = z.infer<typeof userOutputSchema>
export type UserUpdateInput = z.infer<typeof userUpdateInputSchema>
export type UserUpdateOuput = z.infer<typeof userUpdateOutputSchema>
