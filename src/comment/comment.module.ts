import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { Mongoose } from 'mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './models/comment.model';
import { CommentFavoriteSchema } from './models/favorite.model';
import { UserSchema } from './models/user.model';

@Module({
    imports: [ MongooseModule.forFeature([
        { name: 'comment', schema: CommentSchema },
        { name: 'commentFavorites', schema: CommentFavoriteSchema },
        { name: 'users', schema: UserSchema }
    ])
    ],
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule {}