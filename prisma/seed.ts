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
  const ppcManagerPasswordHash = await bcrypt.hash(
    'ppcmanager123',
    10,
  );
  const procurementManagerPasswordHash = await bcrypt.hash(
    'procurementmanager123',
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
      email: 'productionadmin@example.com',
      password: passwordHash2,
      name: 'Production Admin',
      role: 'ADMIN',
      department: 'PRODUCTION',
      position: 'ADMINISTRATIVE_STAFF',
    },
    {
      email: 'salesadmin@example.com',
      password: passwordHash2,
      name: 'Sales Admin',
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
      email: 'customer1@example.com',
      password: passwordHash3,
      name: 'Customer 1',
      role: 'USER',
      department: 'CUSTOMER',
      position: 'CUSTOMER',
    },
    {
      email: 'customer2@example.com',
      password: passwordHash3,
      name: 'Customer 2',
      role: 'USER',
      department: 'CUSTOMER',
      position: 'CUSTOMER',
    },
    {
      email: 'ppcmanager@example.com',
      password: ppcManagerPasswordHash,
      name: 'PPC Manager',
      role: 'ADMIN',
      department: 'PPC',
      position: 'MANAGER',
    },
    {
      email: 'procurementmanager@example.com',
      password: procurementManagerPasswordHash,
      name: 'Procurement Manager',
      role: 'ADMIN',
      department: 'PROCUREMENT',
      position: 'MANAGER',
    },
  ] as const;

  const legacyEmails: Record<string, string[]> = {
    'productionadmin@example.com': ['admin1@example.com'],
    'salesadmin@example.com': ['admin4@example.com'],
    'customer1@example.com': ['user1@example.com'],
    'customer2@example.com': ['user2@example.com'],
    'ppcmanager@example.com': ['admin5@example.com'],
  };

  for (const user of users) {
    let existingUser = await prisma.user.findFirst({
      where: { email: { equals: user.email, mode: 'insensitive' } },
      select: { id: true },
    });

    for (const legacyEmail of legacyEmails[user.email] ?? []) {
      if (existingUser) break;
      existingUser = await prisma.user.findFirst({
        where: { email: { equals: legacyEmail, mode: 'insensitive' } },
        select: { id: true },
      });
    }

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
