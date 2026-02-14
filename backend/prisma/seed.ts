import prisma from "../lib/prisma"
import * as bcrypt from 'bcrypt';

async function main() {

  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash('asdasdasd', saltOrRounds);

  // user 1.
  const admin = await prisma.user.upsert({
    where: { email: 'asd@asd.com' },
    update: {},
    create: {
      email: 'asd@asd.com',
      name: 'Admin',
      password: hashedPassword,
    },
  })

  // user 2.
  const daniel = await prisma.user.upsert({
    where: { email: 'dandamasceno04@gmail.com' },
    update: {},
    create: {
      email: 'dandamasceno04@gmail.com',
      name: 'Daniel',
      password: hashedPassword,
    },
  })

  console.log({ admin, daniel })
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