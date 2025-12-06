const { PrismaClient } = require('@prisma/client');
const argon2 = require('argon2');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'ikperemejohn@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  // Seed classes
  const classNames = ['JSS1','JSS2','JSS3','SS1','SS2','SS3'];
  for (const name of classNames) {
    await prisma.class.upsert({
      where: { name },
      update: {},
      create: { name, level: name }
    });
  }

  // Seed admin
  const hashed = await argon2.hash(adminPassword);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'School Administrator',
      email: adminEmail,
      role: 'ADMIN',
      password: hashed,
      phone: '07039841786'
    }
  });

  console.log('✅ Seed complete. Admin:', adminEmail, '(Password: Admin@123)');
}

main().then(()=>prisma.$disconnect()).catch(e=>{console.error(e); prisma.$disconnect(); process.exit(1);});
