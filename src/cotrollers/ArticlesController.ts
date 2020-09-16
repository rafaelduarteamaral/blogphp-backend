import { Request, Response, NextFunction } from 'express';
import db from '../database/connection';

class ArticlesController {

  async index(req: Request, res: Response) {
    
    if(req.params.id) {
      const articles = await db('articles').select('*').where('id', req.params.id);
      return res.status(200).json(articles);
    }

    const articles = await db('articles').select('*');
    return res.status(200).json(articles);
  }

  async create(req: Request, res: Response) {

    const {
      title,
      img,
      text
    } = req.body;

    const trx = await db.transaction();

    try {

      const insertedArticleIds = await trx('articles').insert({
        title,
        img,
        text
      });

      await trx.commit();

      return res.status(200).send();
    } catch (err) {
      return res.status(400).json({
        error: 'unexpected error while creating new Article'
      });
    }
  }

  async delete(req: Request, res: Response) {
    await db('articles').where({ id: req.params.id }).del();
    return res.status(204).send();

  }
}

export default ArticlesController;