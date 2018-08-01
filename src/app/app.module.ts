import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ShoppingListModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
