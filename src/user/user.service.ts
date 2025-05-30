import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findPaginated(
    limit: number,
    offset: number,
    info: GraphQLResolveInfo,
    search?: string,
  ) {
    const fields = graphqlFields(info);
    const requestedRelations: string[] = [];

    if (fields.users?.profile) requestedRelations.push('profile');
    if (fields.users?.settings) requestedRelations.push('settings');
    if (fields.users?.posts) requestedRelations.push('posts');
    if (fields.users?.comments) requestedRelations.push('comments');
    if (fields.users?.orders) requestedRelations.push('orders');

    const [users, totalCount] = await this.userRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: requestedRelations,
      where: search
        ? [{ name: ILike(`%${search}%`) }, { email: ILike(`%${search}%`) }]
        : {},
    });

    return { users, totalCount };
  }
}
