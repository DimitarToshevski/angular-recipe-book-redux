import { Effect, Actions } from '@ngrx/effects';

import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

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

  @Effect({ dispatch: false })
  recipesStore = this.actions$
  .ofType(RecipeActions.STORE_RECIPES)
  .pipe( withLatestFrom(this.store.select('recipes')) ) // gets the observable from the previous and
  .pipe( switchMap( ([action, state]) => {              // combines it with the value of another observable we pass into
    const req = new HttpRequest ('PUT', 'https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json',
                                 state.recipes, {reportProgress: true});
    return this.http.request(req);
  }) );

  constructor (
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromRecipe.FeatureState>) {}
}
