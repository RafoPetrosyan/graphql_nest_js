import {
  Resolver,
  Query,
  Args,
  Int,
  ObjectType,
  Field,
  Info,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ObjectType()
class PaginatedUsers {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  totalCount: number;
}

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => PaginatedUsers)
  async paginatedUsers(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number,
    @Info() info: GraphQLResolveInfo,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ): Promise<PaginatedUsers> {
    return this.userService.findPaginated(limit, offset, info, search);
  }
}
