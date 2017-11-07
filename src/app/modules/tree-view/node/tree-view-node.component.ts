import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {TreeViewNodeTemplateContext} from '../context/tree-view-node-template-context';
import {TreeViewNodeModel} from '../model/tree-view-node.model';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html'
})
export class TreeViewNodeComponent implements OnInit, OnChanges {

    @Input() treeViewNodeTemplate: TemplateRef<TreeViewNodeTemplateContext>;
    @Input() node: TreeViewNodeModel;
    @Input() focusId;

    treeViewNodeContext: TreeViewNodeTemplateContext;

    constructor() {}

    ngOnInit() {
      this.treeViewNodeContext = {
        node: this.node,
        focusId: this.focusId
      };
    }

    ngOnChanges(changes: SimpleChanges) {
      if (this.node && this.treeViewNodeContext) {
        console.log('OnChanges del nodo');
        console.log(changes);
        this.treeViewNodeContext.node = this.node;
      }
    }

}
