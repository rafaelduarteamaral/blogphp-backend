import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import db from '../database/connection';
const secret = "mysecret";

interface User {
    token: String
}

class UsersController {

    async login(req: Request, res: Response) {
        try {
            const users = await db('users').select('*').where('name', req.body.user).andWhere('password', req.body.password);
            if(users[0]) {
                const id = users[0].id;
                var token = jwt.sign({ id }, secret, {
                    expiresIn: 300
                });
                return res.status(200).send({auth: true, token:token}) 
            }
        } catch(error) {
            res.status(401).send('Login invalido')
        }
    }

    async create(req: Request, res: Response) {
        const {
            name,
            password,
            avatar
        } = req.body;

        const trx = await db.transaction();

        try {
            const insertedUsersIds = await trx('users').insert({
                name,
                password,
                avatar
            });

            await trx.commit();
            return res.status(200).send();
        } catch (err) {
            return res.status(400).json({
                error: 'Unexpected error while creating new Users'
            });
        }
    }

    async logout(req: Request, res: Response) {
        console.log("Fez logout e cancelou o token!");
        res.status(200).send({ auth: false, token: null });
    }

}


export default UsersController;
