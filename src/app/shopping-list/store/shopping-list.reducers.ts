import * as ShoppingListActions from '../store/shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  edittedIngredient: Ingredient;
  edittedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  edittedIngredient: null,
  edittedIngredientIndex: -1
};


export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionsTypes) {
  switch (action.type) {

    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredientToBeUpdated = state.ingredients[state.edittedIngredientIndex];
      const updatedIngredient = {
        ...ingredientToBeUpdated,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.edittedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        edittedIngredient: null,
        edittedIngredientIndex: -1
      };

      case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.edittedIngredientIndex, 1);
        return {
          ...state,
          ingredients: oldIngredients,
          edittedIngredient: null,
          edittedIngredientIndex: -1
        };

        case ShoppingListActions.START_EDIT:
          const edittedIngredient = {...state.ingredients[action.payload]};
          return {
            ...state,
            edittedIngredient: edittedIngredient,
            edittedIngredientIndex: action.payload
          };

        case ShoppingListActions.STOP_EDIT:
          return {
            ...state,
            edittedIngredient: null,
            edittedIngredientIndex: -1
          };
    default:
      return state;
  }
}
