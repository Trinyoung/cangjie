import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseService } from '../base/base.service';
import { CommentDocument } from './models/comment.model';
import { CommentFavoriteDocument } from './models/favorite.model';
import { UserDocument } from './models/user.model';
@Injectable()
export class CommentService extends BaseService<CommentDocument> {
  @InjectModel('users') private userModel: Model<UserDocument>;
  @InjectModel('commentFavorites')
  private commentFavoriteModel: Model<CommentFavoriteDocument>;
  constructor(
    @InjectModel('comment') public commentModel: Model<CommentDocument>,
  ) {
    super(commentModel);
  }

  async getListForComments(
    query: FilterQuery<CommentDocument>,
    uid: string,
    lean: boolean,
    projection?: string,
  ) {
    query = this._fullQuery(query);
    const cursor = this.model.find(query, projection);
    let result: CommentDocument[];
    if (lean) {
      result = await cursor.lean(true);
    } else {
      result = await cursor;
    }
    const favorites: CommentFavoriteDocument[] = await this.commentFavoriteModel.find(
      { createdBy: uid, articleId: query.articleId },
    );
    const favoritesKeyByComment = favorites.reduce((x: any, y) => {
      x[JSON.stringify(y._id)] = y;
      return x;
    }, {});

    const uids: string[] = [];
    const comments = result.map((item) => {
      const newItem = Object.assign(
        { isFavorited: !!favoritesKeyByComment[JSON.stringify(item._id)] },
        item,
      );
      if (item.createdBy) {
        uids.push(item.createdBy);
      }
      return newItem;
    });
    const users = await this.userModel.find(
      { uid: { $in: uids } },
      'uid realName',
    );
    const userKeyByUid = users.reduce((x: any, y: UserDocument) => {
      x[y.uid] = y;
      return x;
    }, {});
    return this._cascaderForComments(comments, [], userKeyByUid);
  }

  private _cascaderForComments(
    comments: CommentDocument[],
    result: any[],
    userKeyByUid: any,
  ) {
    const topComments = comments.filter((item) => item.isTop);
    const childrenComments = comments.filter((item) => !item.isTop);
    const commentKeyById = comments.reduce((x: any, y) => {
      x[JSON.stringify(y._id)] = y;
      return x;
    }, {});
    const commentKeyByParent = childrenComments.reduce((x: any, y) => {
      const replyObj: any = Object.assign({}, y);
      replyObj.nilName =
        y.nilName ||
        (userKeyByUid[y.createdBy] && userKeyByUid[y.createdBy].username) ||
        userKeyByUid[y.createdBy].realName;
      replyObj.email = y.email || userKeyByUid[y.createdBy].email;
      if (y.reply && JSON.stringify(y.reply) !== JSON.stringify(y.parent)) {
        replyObj.target = {
          content: commentKeyById[JSON.stringify(y.reply)].content,
          nilName:
            commentKeyById[JSON.stringify(y.reply)].nilName ||
            userKeyByUid[commentKeyById[JSON.stringify(y.reply)].createdBy]
              .username ||
            userKeyByUid[commentKeyById[JSON.stringify(y.reply)].createdBy]
              .realName,
        };
      }
      if (x[JSON.stringify(y.parent)]) {
        x[JSON.stringify(y.parent)].push(replyObj);
      } else {
        x[JSON.stringify(y.parent)] = [replyObj];
      }
      return x;
    }, {});
    for (let i = 0; i < topComments.length; i++) {
      const comment = Object.assign({ children: [] }, topComments[i]);
      comment.nilName =
        comment.nilName ||
        userKeyByUid[comment.createdBy].username ||
        userKeyByUid[comment.createdBy].realName;
      comment.email = comment.email || userKeyByUid[comment.createdBy].email;
      if (commentKeyByParent[JSON.stringify(comment._id)]) {
        comment.children = commentKeyByParent[JSON.stringify(comment._id)];
      }
      result.push(comment);
    }
    return result;
  }
}
