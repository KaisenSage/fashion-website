/**
 * Generates prisma/fixtures/products.json with 100 example products.
 * Run: node prisma/fixtures/generate-products.js
 *
 * Images are placeholder picsum.photos seeds so each product has a unique stable image URL.
 * Edit the output file prisma/fixtures/products.json to tweak product names, prices, images, categories.
 */
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname);
const outFile = path.join(outDir, "products.json");

const categories = [
  "Dresses",
  "Outerwear",
  "Bottoms",
  "Tops",
  "Accessories",
  "Shoes",
  "Activewear",
  "Bags",
];

const generatePrice = (i) => {
  // price in kobo (NGN) - ranges roughly between 2,500 -> 75,000 Naira
  const base = 250000; // 2,500.00
  const step = 250000; // increments
  return base + (i % 30) * step;
};

const products = Array.from({ length: 100 }).map((_, i) => {
  const id = i + 1;
  const name = `Nexus Fashion Item ${id}`;
  const slug = `nexus-item-${id}`;
  const priceMinor = generatePrice(i);
  const category = categories[i % categories.length];
  // stable placeholder image URL; you can replace with Cloudflare URLs easily
  const images = [
    `https://picsum.photos/seed/${encodeURIComponent(slug)}/1200/900`,
    `https://picsum.photos/seed/${encodeURIComponent(slug)}-2/1200/900`,
  ];
  const stock = Math.floor(Math.random() * 30) + 1;
  const description = `${name} — premium quality, comfortable fit. Category: ${category}.`;

  return {
    name,
    slug,
    description,
    priceMinor,
    images,
    stock,
    category,
    currency: "NGN",
  };
});

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(products, null, 2), "utf8");
console.log("Generated", outFile);