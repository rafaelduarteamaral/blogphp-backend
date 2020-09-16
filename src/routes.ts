import express, {  Request, Response, NextFunction } from 'express';
import verifyJWT from './utils/verifyJWT';

// Classes Routes
import ArticlesController from './cotrollers/ArticlesController';
import UsersController from './cotrollers/UsersController';

const routes = express.Router();

const usersController = new UsersController;
const articlesController = new ArticlesController;

/**
 * Dados de usuário.
 */

routes.post('/login', usersController.login);
routes.post('/users', usersController.create);
routes.post('/logout', usersController.logout);

/**
 * Criação dos post
 */
routes.post('/articles', articlesController.create);
routes.get('/articles/:id', articlesController.index);
routes.get('/articles', articlesController.index);
routes.delete('/articles/:id', articlesController.delete);

//rota protegida
routes.get('/teste', verifyJWT, (req: Request, res: Response, next: NextFunction) => { 
    console.log("Retornou todos clientes!");
    res.status(200).json([{id:1,nome:'rafael'}]);
}) 


export default routes;