import {Component, OnInit} from '@angular/core';
import {TreeViewNodeModel} from '../../modules/tree-view/model/tree-view-node.model';
import {TreeViewService} from '../../modules/tree-view/service/tree-view.service';
import data from '../../modules/tree-view/model/tree-view.data';
import {TreeViewNode} from '../../modules/tree-view/model/tree-view-node-default-model';

@Component({
  selector: 'app-demo-default',
  templateUrl: './demo-default.component.html'
})
export class DemoDefaultComponent implements OnInit {

  nodesExample: TreeViewNodeModel[];

  constructor(public treeViewService: TreeViewService) {}

  ngOnInit() {
    this.nodesExample = data.map( root => this.buildNode(root, 0, null));
  }

  /**
   * Transform a generic model to a tree-view model ...
   * @param item
   * @param level
   * @param focusedId
   * @returns {TreeViewNode}
   */
  private buildNode(item, level, focusedId): TreeViewNodeModel {

    const node = new TreeViewNode();
    node.id = item.id;
    node.title = item.title;
    node.expanded = true;
    node.children = item.children.map( child =>
      this.buildNode(child, level + 1, focusedId));
    return node;
  }

}
