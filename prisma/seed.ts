import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.user.createMany({
    data: [
      { email: "superadmin@example.com", password: "123456", name: "SUPER_ADMIN" },
      { email: "user@example.com", password: "123456",  name: "User" },
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
