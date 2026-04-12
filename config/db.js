import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$connect();
  console.log("✅ Connected to database");
}

main().catch((e) => {
  console.error("❌ Connection failed:", e.message);
  process.exit(1);
});
export default prisma;
