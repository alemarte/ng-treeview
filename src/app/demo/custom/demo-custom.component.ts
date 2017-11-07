import {Component, OnInit} from '@angular/core';
import examples from '../../modules/tree-view/data/tree-view.data';
import {TreeView} from '../../modules/tree-view/model/tree-view-default.model';

@Component({
  selector: 'app-demo-custom',
  templateUrl: './demo-custom.component.html'
})
export class DemoCustomComponent implements OnInit {

  tree: TreeView;

  constructor() {}

  ngOnInit() {
    this.tree = examples.customTree();
  }

}
