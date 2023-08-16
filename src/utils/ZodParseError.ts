import { Response } from 'express'
import { ParseErrorType } from 'src/types/errors'

export function ZodParseError(er: any, res: Response) {
	const error: ParseErrorType = er as ParseErrorType
	res.status(400).send({
		message: error.errors[0].message,
		errors: error.errors[0]
	})
}
