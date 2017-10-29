import { Component, Input } from '@angular/core';
import { TreeViewNode } from './tree-view-node.model';

@Component({
    selector: 'app-tree-view-node',
    templateUrl: './tree-view-node.component.html',
    styleUrls: ['./tree-view-node.component.scss']
})
export class TreeViewNodeComponent {

    @Input() node: TreeViewNode;
    @Input() indent = 0;
    @Input() focusOnNode;

    constructor() {}

     getIndentation() {
        return this.indent * 2 + 'em';
    }

    // getBgColor() {
    //     // if (this.indent === 0) {
    //     //     return 'orange';
    //     // }
    //     // if (this.indent === 1) {
    //     //     return '#F8F8F8';
    //     // }
    //     return '#FFFFFF';
    // }


}
