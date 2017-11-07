import {TreeViewNodeModel} from '../model/tree-view-node.model';
import {Subject} from 'rxjs/Subject';

export class TreeViewService {

  public onExpandTree(nodes: TreeViewNodeModel[]) {
    console.log('Expanding tree...');
    nodes.forEach(node => node.expand(true));
  }

  public onReduceTree(nodes: TreeViewNodeModel[]) {
    console.log('Reducing tree...');
    nodes.forEach(node => node.expand(false));
  }

  public onFilterInput(e, onFiltering: Subject<String>) {
    onFiltering.next(e.target.value);
  }

  /**
   * The number of the node of the tree.
   * @param {TreeViewNode[]} nodes
   * @returns {number}
   */
  public countTree(nodes: TreeViewNodeModel[]) {
    console.log('Counting rendered nodes ...');
    let c = 0;
    nodes.forEach(node => c = c + node.getSize());
    return c;
  }

  /**
   * A node is selected if the node or at least one of its children match the term filter.
   * @param {string} filter
   */
  public filterTree(nodes: TreeViewNodeModel[], filter: string) {
    console.log('Filtering ...');
    filter = filter;
    nodes.forEach(node => {
      node.filter(filter);
    });
  }

}
