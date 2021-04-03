/*
 * @Author: your name
 * @Date: 2021-03-05 14:39:52
 * @LastEditTime: 2021-03-05 14:46:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\favorite.module.ts
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseModel } from '../../base/base.model';
export type CommentFavoriteDocument = CommentFavorite & Document;
@Schema()
export class CommentFavorite extends BaseModel {
  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  commentId: Types.ObjectId;

  @Prop()
  createdBy: string;

  @Prop({ required: true, default: 0 })
  is_deleted: number;
}
export const CommentFavoriteSchema = SchemaFactory.createForClass(
  CommentFavorite,
);
