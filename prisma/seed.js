// prisma/seed.js
// Run: node prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Ribbed Knit Dress",
      slug: "ribbed-knit-dress",
      description: "Comfortable ribbed knit dress — perfect for day and night.",
      priceMinor: 450000, // NGN 4,500.00 stored in kobo
      images: ["/images/sample-products/1.jpg"],
      stock: 12,
      category: "Dresses",
    },
    {
      name: "Tailored Blazer",
      slug: "tailored-blazer",
      description: "Crisp tailored blazer with slim fit.",
      priceMinor: 1200000, // NGN 12,000.00
      images: ["/images/sample-products/2.jpg"],
      stock: 8,
      category: "Outerwear",
    },
    {
      name: "High-Waist Jeans",
      slug: "high-waist-jeans",
      description: "Stretch denim with flattering high waist.",
      priceMinor: 780000,
      images: ["/images/sample-products/3.jpg"],
      stock: 20,
      category: "Bottoms",
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
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