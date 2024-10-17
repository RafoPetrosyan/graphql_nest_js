import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number): User {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('name') name: string, @Args('email') email: string): User {
    return this.userService.create(name, email);
  }
}
