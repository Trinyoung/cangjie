/*
 * @Author: your name
 * @Date: 2021-03-05 14:49:59
 * @LastEditTime: 2021-03-05 15:59:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\comment.service.ts
 */

import { BaseService } from "src/base/base.service";
import { Injectable } from '@nestjs/common';
// import { CommentInterface } from './comment.interface';
import { Comment, CommentDocument } from './models/comment.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
@Injectable()
export class CommentService extends BaseService<CommentDocument> {
  constructor(@InjectModel(Comment.name) public commentModel: Model<CommentDocument>) {
    super(commentModel)
  }
}