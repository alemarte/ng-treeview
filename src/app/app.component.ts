import {Component, OnInit} from '@angular/core';
import data from './modules/tree-view/model/tree-view.data';
import {TreeViewNodeModel} from './modules/tree-view/model/tree-view-node.model';
import {TreeViewNode} from './modules/tree-view/model/tree-view-node-default-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  nodesExample1: TreeViewNodeModel[];
  nodesExample2: TreeViewNodeModel[];

  ngOnInit() {

    this.nodesExample1 = data.map( root => this.buildNode(root, 0, null));
    this.nodesExample2 = data.map( root => this.buildNode(root, 0, null));

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
    node.description = item.description;
    node.code1 = item.code1;
    node.code2 = item.code2;

    node.children = item.children.map( child =>
      this.buildNode(child, level + 1, focusedId));

    return node;
  }

}
