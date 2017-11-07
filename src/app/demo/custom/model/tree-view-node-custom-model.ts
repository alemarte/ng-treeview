import {TreeViewNode} from '../../../modules/tree-view/model/tree-view-node-default.model';

export class TreeViewCustomNode extends TreeViewNode {

  // custom fields
  public code: string;
  public img: string;

  /**
   * Filter condition override.
   * @param term
   * @returns {boolean}
   */
  protected filterCondition(term): boolean {
    if (this.title.toLowerCase().indexOf(term) !== -1) {
      return true;
    }
    if (this.code && (this.code.toLowerCase().indexOf(term) !== -1)) {
      return true;
    }
    return false;
  }

}
