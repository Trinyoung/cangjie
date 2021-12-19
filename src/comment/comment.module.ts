import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connection } from 'mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentFavoriteService } from './commentfavorite.service';
import { CommentSchema } from './models/comment.model';
import { CommentFavoriteSchema } from './models/favorite.model';
import { UserSchema } from './models/user.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'comment', schema: CommentSchema },
      { name: 'commentFavorites', schema: CommentFavoriteSchema },
      { name: 'users', schema: UserSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentFavoriteService,
    {
      provide: 'Connection',
      useValue: connection,
    },
  ],
  exports: [CommentFavoriteService],
})
export class CommentModule {}
