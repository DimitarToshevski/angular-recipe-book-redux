import { Effect, Actions } from '@ngrx/effects';

import * as RecipeActions from '../store/recipe.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {

  @Effect()
  recipeFetch = this.actions$
  .ofType(RecipeActions.FETCH_RECIPES)
  .pipe( switchMap( (action: RecipeActions.FetchRecipes) => {
    return this.http.get<Recipe[]>('https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json');
  }) )
  .pipe( map(
    (recipes) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    }
  ) );

  constructor (private actions$: Actions, private http: HttpClient) {}
}
