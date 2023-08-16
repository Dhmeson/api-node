import express, { Express, Request, Response, Router } from 'express'
import { Server } from '../interfaces/Server'
import cors from 'cors'

export class ExpressServer implements Server {
	private port: number
	private app: Express

	constructor(port: number) {
		this.port = port
		this.app = express()
		this.app.use(cors())
		this.app.use(express.json()) // Para analizar solicitudes JSON
		this.app.use(express.urlencoded({ extended: true })) // Para analizar formularios URL-encoded
	}

	public addRoute(
		method: 'get' | 'post' | 'put' | 'delete',
		path: string,
		handler: (req: Request, res: Response) => void
	): void {
		this.app[method](path, handler)
	}

	public start(): void {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`)
		})
	}
}

