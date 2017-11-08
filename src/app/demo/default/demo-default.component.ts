import {Component, OnInit} from '@angular/core';
import {default as examples} from '../data/tree-view.data';
import {TreeViewModel} from '../../modules/tree-view/model/tree-view.model';

@Component({
  selector: 'app-demo-default',
  templateUrl: './demo-default.component.html'
})
export class DemoDefaultComponent implements OnInit {

  tree: TreeViewModel;

  constructor() {}

  ngOnInit() {
    this.tree = examples.defaultTree();
  }



}
