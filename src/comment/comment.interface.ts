/*
 * @Author: your name
 * @Date: 2021-03-05 16:00:16
 * @LastEditTime: 2021-03-05 16:02:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\comment.interface.ts
 */
import { Types, Document } from 'mongoose';
export interface CommentInterface extends Document {
  // @Prop({ required: true })
  nilName: string;

  // @Prop()
  email: string;

  // @Prop({ default: 0 })
  favoriteNum: number;

  // @Prop({ required: true })
  content: string;

  reply: Types.ObjectId;

  parent: Types.ObjectId;

  isTop: number;

  createdAt: number;

  articleId: Types.ObjectId;

  authorUid: string;

  createdBy: string;
  is_deleted: number;
}
