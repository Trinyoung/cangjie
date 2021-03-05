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
// import {}
import { AppService } from './app.service';
// import { GraphQLModule } from '@nestjs/graphql';
// import { Comment } from './comment/modules/comment.module';
// import { join } from 'path';
// import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/process')],
  controllers: [AppController],
  providers: [AppService],
  // AuthorModule
})
export class AppModule {}
