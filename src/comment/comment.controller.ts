/*
 * @Author: your name
 * @Date: 2021-03-05 16:19:47
 * @LastEditTime: 2021-03-05 17:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\comment.controller.ts
 */
import { Controller, Get, Post, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommentService } from './comment.service';
import { CommentFavoriteService } from './commentfavorite.service';
// import { CommentDocument } from './models/comment.model';
// import { CommentFavoriteDocument } from './models/favorite.model';
@Controller()
export class CommentController {
  private commentFavoriteService: CommentFavoriteService;
  constructor(private service: CommentService) {

  }
  @Get('api/comments/:articleId/list')
  async getListForComments(@Req() req: Request, @Res() res: Response) {
    try {
      const uid = req.query.uid as string;
      const query = req.params;
      const result = await this.service.getListForComments(query, uid, true);
      return res.send({ code: '000', result });
    } catch (err) {
      return res.send({ code: '999', err });
    }
  }

  @Post('/api/comments')
  async createItem(@Req() req: Request, @Res() res: Response) {
    try {
      const body = req.body;
      const result = await this.service.createItem(body);
      return res.send({ code: '000', result });
    } catch (err) {
      return res.send({ code: '999', err });
    }

  }

  @Delete('/api/comments/:id')
  async delete (@Req() req: Request, @Res() res: Response) {
    try {
      const query = req.body;
      await this.service.updateItem(query, {is_deleted: 1});
    } catch (err) {
      return res.send({code: '999', err});
    }
  }

  @Post('/api/comments/favorites')
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const body = req.body;
      const result = await this.commentFavoriteService.createItem(body);
      return res.send({ code: '000', result });
    } catch (err) {
      return res.send({ code: '999', err });
    }
  }
}
