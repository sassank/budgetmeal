import { Controller, Post, Body } from '@nestjs/common';
import { MealPlanService } from './meal-plan.service';

@Controller('meal-plan')
export class MealPlanController {
  constructor(private readonly mealPlanService: MealPlanService) {}

  @Post()
  async createMealPlan(@Body() body: { budget: number; nbMeals: number }) {
    const { budget, nbMeals } = body;
    return this.mealPlanService.generateMealPlan(budget, nbMeals);
  }
}