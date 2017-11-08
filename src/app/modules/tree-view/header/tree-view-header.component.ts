import {Component, Input, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {TreeViewConfig} from '../tree-view-config';
import {TreeViewNodeTemplateContext} from '../context/tree-view-node-template-context';
import {TreeViewHeaderTemplateContext} from '../context/tree-view-header-template-context';
import {TreeViewModel} from '../model/tree-view.model';

@Component({
  selector: 'ng-tree-view-header',
  templateUrl: './tree-view-header.component.html'
})
export class TreeViewHeaderComponent implements OnInit, OnChanges {

  @Input() treeViewHeaderTemplate: TemplateRef<TreeViewNodeTemplateContext>;

  @Input() filter: string;

  @Input() tree: TreeViewModel;

  treeViewHeaderContext: TreeViewHeaderTemplateContext;

  constructor(public treeViewConfig: TreeViewConfig) {}

  ngOnInit() {
    this.treeViewHeaderContext = {
      filter: this.filter,
      tree: this.tree
    };
  }

  ngOnChanges(change) {
    console.log('ngOnChanges ...');
    console.log(change);
    if (this.tree && this.treeViewHeaderContext) {
      this.treeViewHeaderContext.tree = this.tree;
    }
  }

}
