import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class KrogerToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expiresAt: number;
}
