import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface IAllData {
  users: User[];
  totalCount: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(limit: number, offset: number): Promise<IAllData> {
    const [users, totalCount] = await this.usersRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return { users, totalCount };
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(name: string, email: string): Promise<User> {
    const newUser = this.usersRepository.create({ name, email });
    return this.usersRepository.save(newUser);
  }
}
