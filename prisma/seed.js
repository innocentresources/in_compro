import "dotenv/config";
console.log("SEED FILE LOADED");

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("SEED MAIN STARTED");

  const email = "admin@insights.local";
  const password = "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  console.log("HASH GENERATED");

  await prisma.user.deleteMany({});
  console.log("USERS CLEARED");

  await prisma.user.create({
    data: {
      name: "Admin",
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log("ADMIN USER CREATED");
}

main()
  .catch((e) => {
    console.error("SEED ERROR:", e);
  })
  .finally(async () => {
    console.log("SEED FINISHED");
    await prisma.$disconnect();
    process.exit(0);
  });
