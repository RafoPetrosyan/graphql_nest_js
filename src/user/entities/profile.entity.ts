import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  bio: string;

  @Field()
  @Column()
  avatar_url: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
