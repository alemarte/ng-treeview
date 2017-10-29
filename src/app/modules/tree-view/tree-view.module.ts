import {NgModule} from '@angular/core';
import {TreeViewComponent} from './tree-view.component';
import {TreeViewNodeComponent} from './tree-view-node.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [TreeViewNodeComponent, TreeViewComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    exports: [TreeViewNodeComponent, TreeViewComponent]
})
export class TreeViewModule { }

export {TreeViewNode} from './tree-view-node.model';

