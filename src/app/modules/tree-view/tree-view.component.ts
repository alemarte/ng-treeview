import {Component, Input, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {TreeViewNodeModel} from './model/tree-view-node.model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import {TreeViewNodeTemplateContext} from './model/tree-view-node-template-context';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html'
})
export class TreeViewComponent implements OnInit, OnChanges {

  @Input() treeViewNodeTemplate: TemplateRef<TreeViewNodeTemplateContext>;

  @Input() nodes: Array<TreeViewNodeModel>;

  @Input() focusOnNode;

  onFiltering: Subject<string> = new Subject();
  filter;
  count: number = null;

  constructor() {}

  ngOnInit() {
    console.log('Initializing tree...');
    this.onFiltering.debounceTime(400).subscribe(
      x => this.filterTree(x)
    );
    this.scrollToAnchor(this.focusOnNode, 0);
  }

  ngOnChanges(change) {
    console.log('ngOnChanges ...');
    // console.log(change);
    if (this.count === null && this.nodes) {
      console.log('Initializing number of the nodes ...');
      this.count = this.countTree(this.nodes);
    }
  }

  public onExpandTree() {
    console.log('Expanding tree...');
    this.nodes.forEach(node => node.expand(true));
  }

  public onReduceTree() {
    console.log('Reducing tree...');
    this.nodes.forEach(node => node.expand(false));
  }

  public onFilterInput(e) {
    this.onFiltering.next(e.target.value);
  }

  /**
   * A node is selected if the node or at least one of its children match the term filter.
   * @param {string} filter
   */
  public filterTree(filter: string) {
    console.log('Filtering ...');
    this.filter = filter;
    this.nodes.forEach(node => {
      node.filter(this.filter, false, false);
    });
    this.count = this.countTree(this.nodes);
  }

  /**
   * The number of the node of the tree.
   * @param {TreeViewNode[]} nodes
   * @returns {number}
   */
  private countTree(nodes: TreeViewNodeModel[]) {
    console.log('Counting rendered nodes ...');
    let c = 0;
    nodes.forEach(node => c = c + node.getSize());
    return c;
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
