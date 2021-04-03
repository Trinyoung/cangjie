import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Mongoose } from 'mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './models/comment.model';

@Module({
    imports: [MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])],
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule {}