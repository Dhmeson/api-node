import { ExpressServer } from './class/ExpressServer';
import { AddreessController } from './controllers/AddressController';
import { UserController } from './controllers/UserController';
import { Routers } from './routers/Routers';
const app = new ExpressServer(3000);
const routerManager = new Routers(app);
app.addRoute('get', '/', (req, res) => {
  res.send('ok');
});
const userController = new UserController();
const addressController = new AddreessController();

routerManager.apply(userController, 'user');
routerManager.apply(addressController, 'address');

app.start();
