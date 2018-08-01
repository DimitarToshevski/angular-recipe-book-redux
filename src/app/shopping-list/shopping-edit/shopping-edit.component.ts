import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;

  subscription: Subscription;

  editMode = false;
  editedItem: Ingredient;

    constructor(private store: Store<fromShoppingList.AppState>) { }

    ngOnInit() {
      this.subscription = this.store.select('shoppingList')
        .subscribe(
          data => {
            if (data.edittedIngredientIndex > -1) {
              this.editedItem = data.edittedIngredient;
              this.editMode = true;
              this.shoppingListForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
              });
            } else {
              this.editMode = false;
            }
          }
        );
    // this.subscription = this.shoppingListService.startedEditing
    // .subscribe((index: number) => {
    //   this.editedItemIndex = index;
    //   this.editMode = true;
    //   this.editedItem = this.shoppingListService.getIngredient(index);
    //   this.shoppingListForm.setValue({
    //     name: this.editedItem.name,
    //     amount: this.editedItem.amount
    //   });
    // });
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
