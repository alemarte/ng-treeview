import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeViewModule } from './modules/tree-view/tree-view.module';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TreeViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
