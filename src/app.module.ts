/*
 * @Author: your name
 * @Date: 2021-03-05 08:58:50
 * @LastEditTime: 2021-03-05 17:02:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cangjie\src\app.module.ts
 */
// @@filename(app.module)
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;
// const mongodbUrl = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

// const mongodbUrl = 'mongodb://localhost:27017/process';
// console.log(mongodbUrl, '----------------->');
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:[`.env.${process.env.NODE_ENV}`]
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        // console.log(process.env.DB, '=====mongodb config=========>');
        return {
          uri: process.env.DB
        }
      }
    }),
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
