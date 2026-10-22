import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import * as bcrypt from 'bcrypt'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const passwordHash1 = await bcrypt.hash('super123admin', 10);
  const passwordHash2 = await bcrypt.hash('admin123', 10);
  const passwordHash3 = await bcrypt.hash('user123', 10);

  await prisma.user.deleteMany(); 
  await prisma.user.createMany({
    data: [
      {
      email: 'superadmin@example.com',
      password: passwordHash1,
      name: "SUPER ADMIN",
      role: "SUPER_ADMIN",
    },
      {
      email: 'admin1@example.com',
      password: passwordHash2,
      name: "Admin 1",
      role: "ADMIN",
    },
      {
      email: 'user1@example.com',
      password: passwordHash3,
      name: "User 1",
      role: "USER",
    },
  ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
