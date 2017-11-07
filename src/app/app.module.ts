import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TreeViewModule} from './modules/tree-view/tree-view.module';
import {RouterModule, Routes} from '@angular/router';
import {DemoDefaultComponent} from './demo/default/demo-default.component';
import {DemoCustomComponent} from './demo/custom/demo-custom.component';

const appRoutes: Routes = [
  { path: 'default', component: DemoDefaultComponent},
  { path: 'custom', component: DemoCustomComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DemoDefaultComponent,
    DemoCustomComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    TreeViewModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
