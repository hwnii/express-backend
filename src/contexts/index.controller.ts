import { Router } from 'express';
import accountsController from './accounts/accounts.controller';
import rootController from './root/root.controller';

const controllers = Router();

controllers.use('/', rootController);
controllers.use('/accounts', accountsController);

export default controllers;
