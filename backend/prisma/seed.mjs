import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');
  const user1 = await prisma.user.create({
    data: {
      username: 'john',
      password: '$2b$10$YhZIRU/bL6gKQctiariPF.8fXcnAljg0uD2uXgrRg3Ob8gvG.sVES', // password
    },
  });
  await prisma.item.create({
    data: {
      body: 'My Item1',
      status: 'TODO',
      userId: user1.id,
    },
  });
  await prisma.item.create({
    data: {
      body: 'My Item2',
      status: 'IN_PROGRESS',
      userId: user1.id,
    },
  });
  await prisma.item.create({
    data: {
      body: 'My Item3',
      status: 'DONE',
      userId: user1.id,
    },
  });
  console.log('Data seeding complete.');
}

main()
  .catch((err) => {
    console.error('Error seeding data:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
