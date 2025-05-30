import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { UserSettings } from './entities/user-settings.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Order } from './entities/order.entity';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      UserSettings,
      Post,
      Comment,
      Order,
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
