import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash1 = await bcrypt.hash('super1234admin', 10);
  const passwordHash2 = await bcrypt.hash('admin1234', 10);
  const passwordHash3 = await bcrypt.hash('user1234', 10);
  const qaManagerPasswordHash = await bcrypt.hash('qamanager123', 10);
  const productionManagerPasswordHash = await bcrypt.hash(
    'productionmanager123',
    10,
  );

  const users = [
    {
      email: 'superadmin@example.com',
      password: passwordHash1,
      name: 'SUPER ADMIN',
      role: 'SUPER_ADMIN',
      department: 'IT',
      position: 'MANAGER',
    },
    {
      email: 'admin1@example.com',
      password: passwordHash2,
      name: 'Admin 1',
      role: 'ADMIN',
      department: 'PRODUCTION',
      position: 'ADMINISTRATIVE_STAFF',
    },
    {
      email: 'admin4@example.com',
      password: passwordHash2,
      name: 'Admin Sales',
      role: 'ADMIN',
      department: 'SALES',
      position: 'ADMINISTRATIVE_STAFF',
    },
    {
      email: 'qamanager@example.com',
      password: qaManagerPasswordHash,
      name: 'QA Manager',
      role: 'ADMIN',
      department: 'QA',
      position: 'MANAGER',
    },
    {
      email: 'productionmanager@example.com',
      password: productionManagerPasswordHash,
      name: 'Production Manager',
      role: 'ADMIN',
      department: 'PRODUCTION',
      position: 'MANAGER',
    },
    {
      email: 'user1@example.com',
      password: passwordHash3,
      name: 'User 1',
      role: 'USER',
      department: 'CUSTOMER',
      position: 'CUSTOMER',
    },
  ] as const;

  for (const user of users) {
    const existingUser = await prisma.user.findFirst({
      where: { email: { equals: user.email, mode: 'insensitive' } },
      select: { id: true },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: user,
      });
    } else {
      await prisma.user.create({ data: user });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
