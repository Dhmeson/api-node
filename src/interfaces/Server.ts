import { Request, Response } from 'express'

export interface Server {
	addRoute: (
		method: 'get' | 'post' | 'put' | 'delete',
		path: string,
		handler: (req: Request, res: Response) => void
	) => void
	start: (port: number, callback: () => void) => void
}
