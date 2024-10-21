import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { User } from './user.entity';
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
  async users(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number,
  ): Promise<PaginatedUsers> {
    return this.userService.findAll(limit, offset);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.userService.create(name, email);
  }
}
