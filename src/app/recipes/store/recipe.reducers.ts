import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {

    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

      case RecipeActions.ADD_RECIPE:
        return {
          ...state,
          recipes: [...state.recipes, action.payload]
        };

      case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index]; // getting the old recipe at payload index
      const updatedRecipe = { // setting the properties of the new recipe by taking the old ones and replacing the updated ones
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes]; // getting a copy of the old recipes array
      recipes[action.payload.index] = updatedRecipe; // swapping the recipe on payload index with updated recipe
        return {
          ...state,
          recipes: recipes // setting the recipes property to be equal to the updated recipe array
        };

      case RecipeActions.DELETE_RECIPE:
        const oldRecipes = [...state.recipes]; // getting a copy of the old recipes array
        const updatedRecipes = oldRecipes.splice(action.payload, 1);
        return {
          ...state,
          recipes: updatedRecipes
        };

      default:
        return state;
  }
}
