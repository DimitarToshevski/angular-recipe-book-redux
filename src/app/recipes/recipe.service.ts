import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
    'A super tasty schnitzel - just awesome!',
    'https://thumbs.dreamstime.com/b/wiener-schnitzel-french-fries-breaded-steak-lemon-56757436.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]
  ),
  new Recipe('A Big Fat Burger',
    'What else do we need to say?',
    'https://favim.com/orig/201108/04/big-mac-burger-diet-fat-food-Favim.com-119798.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 2)
    ]
  )
  ];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

}
