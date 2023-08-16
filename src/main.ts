import { ExpressServer } from './class/ExpressServer'
import { UserController } from './controllers/UserController'
import { Routers } from './routers/Routers'
const app = new ExpressServer(3000)
const routerManager = new Routers(app)
app.addRoute('get', '/', (req, res) => {
	res.send('ok')
})
const userController = new UserController()
routerManager.apply(userController, 'user')

app.start()

