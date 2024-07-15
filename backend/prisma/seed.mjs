import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  return await prisma.$transaction(async (tx) => {
    console.log('Seeding data...');

    const user1 = await tx.user.create({
      data: {
        username: 'john',
        password:
          '$2b$10$YhZIRU/bL6gKQctiariPF.8fXcnAljg0uD2uXgrRg3Ob8gvG.sVES', // changeme
      },
    });
    await tx.item.create({
      data: {
        body: 'My Item1',
        status: Status.TODO,
        userId: user1.id,
      },
    });
    await tx.item.create({
      data: {
        body: 'My Item2',
        status: Status.IN_PROGRESS,
        userId: user1.id,
      },
    });
    await tx.item.create({
      data: {
        body: 'My Item3',
        status: Status.DONE,
        userId: user1.id,
      },
    });
  });
}

main()
  .then(() => {
    console.log('Data seeding complete.');
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
