import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {TreeViewNodeTemplateContext} from '../model/tree-view-node-template-context';
import {TreeViewNodeModel} from '../model/tree-view-node.model';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html'
})
export class TreeViewNodeComponent implements OnInit {

    @Input() treeViewNodeTemplate: TemplateRef<TreeViewNodeTemplateContext>;

    @Input() node: TreeViewNodeModel;
    @Input() indent = 0;
    @Input() focusOnNode;

    treeViewNodeContext: TreeViewNodeTemplateContext;

    constructor() {}

    ngOnInit() {
      this.treeViewNodeContext = {
        node: this.node,
        indent: this.indent,
        focus: this.focusOnNode
      };
    }

}
