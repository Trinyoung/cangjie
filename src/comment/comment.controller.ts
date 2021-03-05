/*
 * @Author: your name
 * @Date: 2021-03-05 16:19:47
 * @LastEditTime: 2021-03-05 17:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\comment.controller.ts
 */
import { Controller, Get, Req } from '@nestjs/common';
import { request } from 'express';
@Controller('comment')
export class CommentController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'this action returns all cats';
  }
}
