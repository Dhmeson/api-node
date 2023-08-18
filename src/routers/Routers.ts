import { Controller } from '../interfaces/Controller';
import { Server } from '../interfaces/Server';

export class Routers {
  constructor(readonly app: Server) {
    this.app = app;
  }
  apply(controller: Controller, path: string, paramName: string = 'id') {
    const path_ = '/'.concat(path);
    const paramPath = path_.concat('/:').concat(paramName);
    this.app.addRoute('post', path_, controller.create);
    this.app.addRoute('put', paramPath, controller.update);
    this.app.addRoute('delete', paramPath, controller.delete);
    this.app.addRoute('get', path_, controller.find);
    this.app.addRoute('get', paramPath, controller.findById);
  }
}
