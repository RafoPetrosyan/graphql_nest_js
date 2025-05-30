import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'nestgraphql',
  entities: [__dirname + '/src/**/*.entity.ts'],
  migrations: [__dirname + '/src/migrations/*.ts'],
  synchronize: false, // important: disable in production
});
