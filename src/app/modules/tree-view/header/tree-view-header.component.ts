import {Component, Input, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {TreeViewConfig} from '../tree-view-config';
import {TreeViewService} from '../service/tree-view.service';
import {TreeViewNodeTemplateContext} from '../model/tree-view-node-template-context';
import {TreeViewHeaderTemplateContext} from '../model/tree-view-header-template-context';
import {Subject} from 'rxjs/Subject';
import {TreeViewNodeModel} from '../model/tree-view-node.model';

@Component({
  selector: 'app-tree-view-header',
  templateUrl: './tree-view-header.component.html'
})
export class TreeViewHeaderComponent implements OnInit, OnChanges {

  @Input() treeViewHeaderTemplate: TemplateRef<TreeViewNodeTemplateContext>;

  @Input() onfiltering: Subject<string>;

  @Input() filter: string;

  @Input() count: number;

  @Input() nodes: TreeViewNodeModel[];

  treeViewHeaderContext: TreeViewHeaderTemplateContext;

  constructor(public treeViewConfig: TreeViewConfig, public treeViewService: TreeViewService) {}

  ngOnInit() {
    this.treeViewHeaderContext = {
      filter: this.filter,
      count: this.count,
      onfiltering: this.onfiltering,
      nodes: this.nodes
    };
  }

  ngOnChanges(change) {
    console.log('ngOnChanges ...');
    // console.log(change);
    if (this.nodes) {
      if (this.count === null) {
        console.log('Initializing number of the nodes ...');
      }
      this.count = this.treeViewService.countTree(this.nodes);
      if (this.treeViewHeaderContext) {
        this.treeViewHeaderContext.count = this.count;
      }
    }
  }

}
