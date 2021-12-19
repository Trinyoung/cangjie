import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { RedisService } from 'nestjs-redis';
// import cacheHelper from './cacheHelper';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly redisService: RedisService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let authorization = '';
    if (req.headers.authorization) {
      authorization = req.headers.authorization.split(' ')[1];
    }
    if (!authorization) {
      return next();
    }
    const authId = req.cookies.nvwaId;
    try {
      const playLoad = jwt.verify(authorization, authId) as playLoadInterface;
      const now = moment().unix();
      const redisClient = await this.redisService.getClient('');
      if (now >= playLoad.exp) {
        // redisClient.del('userInfo', authorization, function )
        // this.redisService.getClient
        redisClient.del('userInfo', authorization, function (err) {
          if (err) {
            console.error('删除用户token出错', err);
          }
          console.info(`清除token ${authorization}成功`);
        });
      }
      await new Promise(function (resolve, reject) {
        redisClient.get('userInfo', function (err, result) {
          if (err) {
            console.info(`获取token失败`, err);
            return;
          }
          if (!result) {
            return res.send({ code: '401', message: '未能找到相关的用户信息' });
          }
          req.headers.user = JSON.parse(decodeURIComponent(result));
          return resolve(null);
        });
      });
      next();
    } catch (err) {
      console.error('鉴权失败', err);
      return res.send({ code: '401', err });
    }
  }
}
interface playLoadInterface {
  exp: number;
  username: string;
}
