const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const email = process.argv[2];

if (!email) {
  console.error('Please provide an email address: node scripts/setAdmin.js <email>');
  process.exit(1);
}

async function setAdmin() {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'admin' },
    });
    console.log(`Success! User ${user.email} is now an admin.`);
  } catch (error) {
    console.error('Error updating user:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

setAdmin();
