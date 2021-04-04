/*
 * @Author: your name
 * @Date: 2021-03-05 16:19:47
 * @LastEditTime: 2021-03-05 17:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\comment.controller.ts
 */
import { Controller, Get, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import {CommentService } from './comment.service'
@Controller('commentFavorite')
export class CommentFavoriteController {
  constructor (private commentSevice: CommentService) {
    
  }
  @Get()
  findAll(@Req() request: Request): string {
    return 'this action returns all cats';
  }
}
