import { prisma } from "../app/lib/database";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("Start seeding...");
  // Delete all existing data
  await prisma.product.deleteMany({});

  const products = [];
  for (let i = 0; i < 50; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 50, max: 2000 })),
      imageUrl: faker.image.url(),
    });
  }

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
