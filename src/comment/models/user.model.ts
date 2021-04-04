/*
 * @Author: your name
 * @Date: 2021-03-05 14:14:36
 * @LastEditTime: 2021-03-05 14:39:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\user.module.ts
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop()
  realName: string;

  @Prop({ default: 0 })
  password: number;

  @Prop({ required: true })
  birthday: string;

  @Prop({ enum: [0, 1, 2], default: 0 })
  gender: number;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;

  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ enum: [0, 1], required: true, default: 0 })
  is_deleted: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
