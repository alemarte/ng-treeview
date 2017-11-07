import {TreeViewModel} from './tree-view.model';
import {TreeViewNodeModel} from './tree-view-node.model';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

export class TreeView implements TreeViewModel {

  private nodes: TreeViewNodeModel[];

  private count: number;
  private firstNode: TreeViewNodeModel;
  private lastNode: TreeViewNodeModel;

  private onFiltering: Subject<string> = new Subject();

  public constructor() {
    this.onFiltering.debounceTime(400).subscribe(
      x => {
        console.log('debounced');
        this.filterTree(x);
      }
    );
  }

  public withNodes(nodes: TreeViewNodeModel[]): TreeViewModel {
    this.nodes = nodes;
    this.resetTree();
    return this;
  }

  public getNodes(): TreeViewNodeModel[] {
    return this.nodes;
  }

  public onExpandTree() {
    this.nodes.forEach(node => node.expand(true));
  }

  public onCollapseTree() {
    this.nodes.forEach(node => node.expand(false));
  }

  public onFilterInput(e) {
    this.onFiltering.next(e.target.value);
  }

  public getSize(): number {
    if (this.count !== null) {
      return this.count;
    }
    return this.computeSize();
  }

  private computeSize(): number {
    console.log('Computing new size of the tree...');
    let c = 0;
    this.getNodes().forEach(node => c = c + node.getSize());
    this.count = c;
    return c;
  }

  public filterTree(term: string) {
    console.log('Filtering ...');
    this.nodes.forEach(node => {
      node.filter(term);
    });
    this.setFirstAndLast();
    this.computeSize();
  }

  public getFirst(): TreeViewNodeModel {
    if (this.firstNode === null) {
      this.setFirstAndLast();
    }
    return this.firstNode;
  }

  public getLast(): TreeViewNodeModel {
    if (this.firstNode === null) {
      this.setFirstAndLast();
    }
    return this.lastNode;
  }

  private setFirstAndLast() {
    // set first
    this.firstNode = this.nodes[0];
    // set last
    this.lastNode = this.lastChildren(this.nodes[this.nodes.length - 1]);
  }

  private lastChildren(node: TreeViewNodeModel) {
    if (node.getChildren().length === 0) {
      return node;
    }
    return this.lastChildren(node.getChildren()[node.getChildren().length - 1]);
  }

  private resetTree() {
    this.nodes.forEach(node => this.resetNode(node, 0));
    this.setFirstAndLast();
    this.computeSize();
  }

  private resetNode(node: TreeViewNodeModel, level) {
    node.setTree(this);
    node.setLevel(level);
    node.getChildren().forEach(child => this.resetNode(child, level + 1));
  }


}
