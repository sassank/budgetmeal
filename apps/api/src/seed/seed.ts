import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();

  const recipe1 = await prisma.recipe.create({
    data: {
      name: 'Salade de quinoa',
      cost: 5,
      prepTime: 15,
      category: 'cheap',
      ingredients: {
        create: [{ name: 'Quinoa', quantity: '100g' }],
      },
    },
  });

  const recipe2 = await prisma.recipe.create({
    data: {
      name: 'Omelette',
      cost: 4,
      prepTime: 10,
      category: 'cheap',
      ingredients: {
        create: [{ name: 'Œufs', quantity: '2' }],
      },
    },
  });

  console.log('Seed done:', recipe1.name, recipe2.name);
}

seed().then(() => process.exit());