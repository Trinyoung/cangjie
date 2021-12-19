/*
 * @Author: your name
 * @Date: 2021-03-05 14:49:59
 * @LastEditTime: 2021-03-05 15:59:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\comment.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { BaseService } from "../base/base.service";
// import { Comment, CommentDocument } from './models/comment.model';
import { CommentFavoriteDocument } from './models/favorite.model';
// import { UserDocument} from './models/user.model';
@Injectable() // CommentFavoriteService 作为供应商。
export class CommentFavoriteService extends BaseService<CommentFavoriteDocument> {
    constructor (@InjectModel('commentFavorites') public commentFavoriteModel: Model<CommentFavoriteDocument>) {
        super(commentFavoriteModel);
    }
}