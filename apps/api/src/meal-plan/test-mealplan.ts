import { MealPlanService } from './meal-plan.service';

async function main() {
  const service = new MealPlanService();

  const budget = 30;
  const nbMeals = 5;

  const result = await service.generateMealPlan(budget, nbMeals);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});