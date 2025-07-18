import { prisma } from "@/app/lib/database";
import { faker } from "@faker-js/faker";

async function generateProducts() {
  console.log("Start seeding products...");
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

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true, // Avoid duplicates if any
  });

  console.log("Seeding finished.");
}

async function generateUsers() {
  console.log("Start seeding users...");
  // Delete all existing data
  await prisma.user.deleteMany({});

  const users = [];
  for (let i = 0; i < 20; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true, // Avoid duplicates if any
  });

  console.log("User seeding finished.");
}

export async function GET() {
  try {
    // Simulate a seed operation
    console.log("Seeding database...");
    await Promise.all([generateProducts(), generateUsers()]);

    console.log("Database seeded successfully.");
    return new Response("Database seeded successfully.", { status: 200 });
  } catch (error) {
    console.error("Error seeding database:", error);
    return new Response("Failed to seed database.", { status: 500 });
  }
}