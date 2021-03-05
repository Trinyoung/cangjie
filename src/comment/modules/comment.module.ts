/*
 * @Author: your name
 * @Date: 2021-03-05 09:26:34
 * @LastEditTime: 2021-03-05 14:35:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\author\author.module.ts
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
export type CommentDocument = Comment & Document;
@Schema()
export class Comment {
  @Prop({ required: true })
  nilName: string;

  @Prop()
  email: string;

  @Prop({ default: 0 })
  favoriteNum: number;

  @Prop({ required: true })
  content: string;

  @Prop()
  reply: Mongoose.Schema.Types.ObjectId;

  @Prop()
  parent: Mongoose.Schema.Types.ObjectId;

  @Prop({ enum: [0, 1], default: 1 })
  isTop: number;

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  articleId: Mongoose.Types.ObjectId;

  @Prop({ required: true })
  authorUid: string;

  @Prop()
  createdBy: string;

  @Prop({ required: true, default: 0 })
  is_deleted: number;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
