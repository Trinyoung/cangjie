/*
 * @Author: your name
 * @Date: 2021-03-05 09:26:34
 * @LastEditTime: 2021-03-05 14:35:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\author\author.module.ts
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Type } from 'mongoose';
import { BaseModel } from 'src/base/base.model';
export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends BaseModel {
  @Prop()
  nilName: string;

  @Prop()
  email: string;

  @Prop({ default: 0 })
  favoriteNum: number;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Type.Types.ObjectId })
  reply: Type.Types.ObjectId;

  @Prop({ type: Type.Types.ObjectId })
  parent: Type.Types.ObjectId;

  @Prop({ enum: [0, 1], default: 1 })
  isTop: number;

  // @Prop({ required: true })
  // createdAt: number;

  @Prop({ type: Type.Types.ObjectId, required: true })
  articleId: Type.Types.ObjectId;

  @Prop({ required: true })
  authorUid: string;

  @Prop()
  createdBy: string;

  @Prop({ required: true, default: 0 })
  is_deleted: number;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
// const schema = new MSchema();
