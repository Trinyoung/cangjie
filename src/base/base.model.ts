/*
 * @Author: your name
 * @Date: 2021-03-05 14:14:36
 * @LastEditTime: 2021-03-05 14:39:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\comment\user.module.ts
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type BaseDocument = BaseModel & Document;

@Schema()
export class BaseModel {
  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;

  @Prop()
  updatedBy: string;

  @Prop()
  createdBy: string;

  @Prop({ enum: [0, 1], required: true, default: 0 })
  is_deleted: number;
}
// export const UserSchema = SchemaFactory.createForClass(User);
