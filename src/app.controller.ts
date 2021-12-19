import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CommentFavoriteService } from './comment/commentfavorite.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private commentFavoriteService: CommentFavoriteService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hi')
  async getHi(): Promise<string> {
    await this.commentFavoriteService.getItem();
    return 'hahaha';
  }
}
