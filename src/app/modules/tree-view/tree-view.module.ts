import {ModuleWithProviders, NgModule} from '@angular/core';
import {TreeViewComponent} from './tree-view.component';
import {TreeViewNodeComponent} from './node/tree-view-node.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TreeViewConfig} from './tree-view-config';
import {TreeViewHeaderComponent} from './header/tree-view-header.component';

export {TreeViewModel} from './model/tree-view.model';
export {TreeView} from './model/tree-view-default.model';
export {TreeViewNodeModel} from './model/tree-view-node.model';
export {TreeViewNode} from './model/tree-view-node-default.model';
export {TreeViewConfig} from './tree-view-config';

@NgModule({
    declarations: [TreeViewNodeComponent, TreeViewHeaderComponent, TreeViewComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [TreeViewNodeComponent, TreeViewHeaderComponent, TreeViewComponent]
})
export class NgTreeViewModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgTreeViewModule,
      providers: [
        TreeViewConfig
      ]
    };
  }
}


