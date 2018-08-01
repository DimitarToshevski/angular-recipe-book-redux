import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor (private http: HttpClient,
               private recipeService: RecipeService,
               private authService: AuthService) { }

  storeRecipes() {
    return this.http.put('https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json',
                   this.recipeService.getRecipes());
  }

  getRecipes() {
   // const token = this.authService.getToken();
    this.http.get<Recipe[]>('https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json')

    // Added AuthInterceptor to add params instead of adding params to each request
    // this.http.get<Recipe[]>('https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json',
    // { params: new HttpParams().set('auth', token) })

    .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
    )
      .subscribe(
        (recipes: Recipe[]) => {
           this.recipeService.setRecipes(recipes);
        }
      );
  }
}
