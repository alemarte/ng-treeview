import {Component, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {TreeViewNodeModel} from './model/tree-view-node.model';
import {TreeViewNodeTemplateContext} from './model/tree-view-node-template-context';
import 'rxjs/add/operator/debounceTime';
import {TreeViewConfig} from './tree-view-config';
import {Subject} from 'rxjs/Subject';
import {TreeViewService} from './service/tree-view.service';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeViewComponent implements OnInit {

  @Input() treeViewHeaderTemplate: TemplateRef<TreeViewNodeTemplateContext>;
  @Input() treeViewNodeTemplate: TemplateRef<TreeViewNodeTemplateContext>;

  @Input() nodes: Array<TreeViewNodeModel>;

  @Input() focusOnNode;

  @Input() onFiltering: Subject<string> = new Subject();
  filter;
  count: number = null;

  constructor(public treeViewConfig: TreeViewConfig, public treeViewService: TreeViewService) {}

  ngOnInit() {
    console.log('Initializing tree...');
    this.onFiltering.debounceTime(400).subscribe(
      x => {
        this.treeViewService.filterTree(this.nodes, x);
        this.count = this.treeViewService.countTree(this.nodes);
      }
    );
    this.scrollToAnchor(this.focusOnNode, 0);
  }

  /**
   * Utility per effettuare lo scroll sull'element con id location.
   * @param {string} location
   * @param {number} wait
   */
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
