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
;
import { CommentModule } from './comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost/process'), CommentModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
