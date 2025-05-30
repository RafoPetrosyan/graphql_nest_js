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
export class UserSettings {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  theme: string;

  @Field()
  @Column()
  language: string;

  @OneToOne(() => User, (user) => user.settings)
  @JoinColumn()
  user: User;
}
