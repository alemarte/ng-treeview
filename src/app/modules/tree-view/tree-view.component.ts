import {Component, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {TreeViewNodeTemplateContext} from './context/tree-view-node-template-context';
import {TreeViewConfig} from './tree-view-config';
import {TreeViewModel} from './model/tree-view.model';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeViewComponent implements OnInit {

  @Input() treeViewHeaderTemplate: TemplateRef<TreeViewNodeTemplateContext>;
  @Input() treeViewNodeTemplate: TemplateRef<TreeViewNodeTemplateContext>;

  @Input() tree: TreeViewModel;

  @Input() focusId;

  filter;

  constructor(public treeViewConfig: TreeViewConfig) {}

  ngOnInit() {
    this.scrollToAnchor(this.focusId, 0);
  }

  private scrollToAnchor(location: string, wait: number): void {
    setTimeout(() => {
      const element = document.querySelector('#n' + location);
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2);
        window.scrollTo(0, middle);
      }
    }, wait);
  }

}
