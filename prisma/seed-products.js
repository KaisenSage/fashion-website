/**
 * Read prisma/fixtures/products.json and upsert into Prisma DB.
 * Run: node prisma/seed-products.js
 *
 * Make sure:
 * - npx prisma generate has been run
 * - npx prisma db push (or migrate) has been run and your DATABASE_URL points to your dev DB
 */
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();
const fixtures = path.join(__dirname, "fixtures", "products.json");

async function main() {
  if (!fs.existsSync(fixtures)) {
    console.error("fixtures file not found:", fixtures);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(fixtures, "utf8"));

  for (const p of products) {
    const createData = {
      name: p.name,
      slug: p.slug,
      description: p.description || null,
      priceMinor: p.priceMinor,
      currency: p.currency || "NGN",
      images: p.images || [],
      stock: p.stock ?? 0,
      category: p.category || null,
    };

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: createData,
      create: createData,
    });
    console.log("Upserted", p.slug);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });