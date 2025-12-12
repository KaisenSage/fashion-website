// scripts/seed-all.js
// Run: node scripts/seed-all.js
const { execSync } = require("child_process");
const path = require("path");

function run(cmd) {
  console.log("$", cmd);
  execSync(cmd, { stdio: "inherit", cwd: process.cwd() });
}

async function main() {
  // 1) generate products.json
  run("node prisma/fixtures/generate-products.js");
  // 2) push schema (ensure DATABASE_URL points to sqlite file)
  run('DATABASE_URL="file:./dev.db" npx prisma db push');
  // 3) generate client
  run("npx prisma generate");
  // 4) seed
  run("node prisma/seed-products.js");
}

main();