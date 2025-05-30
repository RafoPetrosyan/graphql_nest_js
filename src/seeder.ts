import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../ormconfig';
import { User } from './user/entities/user.entity';
import { Profile } from './user/entities/profile.entity';
import { UserSettings } from './user/entities/user-settings.entity';
import { Post } from './user/entities/post.entity';
import { Comment } from './user/entities/comment.entity';
import { Order } from './user/entities/order.entity';

async function seed() {
  const dataSource: DataSource = await AppDataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const profileRepo = dataSource.getRepository(Profile);
  const settingsRepo = dataSource.getRepository(UserSettings);
  const postRepo = dataSource.getRepository(Post);
  const commentRepo = dataSource.getRepository(Comment);
  const orderRepo = dataSource.getRepository(Order);

  for (let i = 0; i < 100000; i++) {
    const user = userRepo.create({
      name: faker.person.fullName(),
      email: i + faker.internet.email(),
    });
    await userRepo.save(user);

    const profile = profileRepo.create({
      bio: faker.lorem.sentence(),
      avatar_url: faker.image.avatar(),
      user: user,
    });
    await profileRepo.save(profile);

    const settings = settingsRepo.create({
      theme: 'light',
      language: 'en',
      user: user,
    });
    await settingsRepo.save(settings);

    const posts = Array.from({ length: 5 }).map(() =>
      postRepo.create({
        title: faker.lorem.words(3),
        content: faker.lorem.paragraph(),
        user: user,
      }),
    );
    await postRepo.save(posts);

    const comments = Array.from({ length: 10 }).map(() =>
      commentRepo.create({
        text: faker.lorem.sentence(),
        user: user,
      }),
    );
    await commentRepo.save(comments);

    const orders = Array.from({ length: 2 }).map(() =>
      orderRepo.create({
        product_name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        user: user,
      }),
    );
    await orderRepo.save(orders);

    if (i % 100 === 0) {
      console.log(`Seeded ${i} users...`);
    }
  }

  console.log('Seeding complete ✅');
  await dataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
