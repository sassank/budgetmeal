import { Injectable } from '@nestjs/common';
import { PrismaClient, Recipe } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MealPlanService {
  async generateMealPlan(budget: number, nbMeals: number) {
    // 1️⃣ Récupérer toutes les recettes avec les ingrédients
    const allRecipes = await prisma.recipe.findMany({
      include: { ingredients: true },
    });

    // 2️⃣ Typage correct pour selectedRecipes
    const selectedRecipes: (Recipe & {
      ingredients: { id: number; name: string; quantity: string; recipeId: number }[];
    })[] = [];

    let totalCost = 0;

    // 3️⃣ Sélectionner les recettes selon budget et nbMeals
    for (const recipe of allRecipes) {
      if (selectedRecipes.length < nbMeals && totalCost + recipe.cost <= budget) {
        selectedRecipes.push(recipe);
        totalCost += recipe.cost;
      }
    }

    // 4️⃣ Construire la liste des courses
    const shoppingList: { name: string; quantity: string }[] = [];

    selectedRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        shoppingList.push({
          name: ingredient.name,
          quantity: ingredient.quantity,
        });
      });
    });

    // 5️⃣ Enregistrer le meal plan en base
    const mealPlan = await prisma.mealPlan.create({
      data: {
        budget,
        nbMeals,
        totalCost,
        recipes: {
          connect: selectedRecipes.map((r) => ({ id: r.id })),
        },
      },
    });

    // 6️⃣ Retourner la réponse
    return {
      meals: selectedRecipes,
      shoppingList,
      totalCost,
    };
  }
}