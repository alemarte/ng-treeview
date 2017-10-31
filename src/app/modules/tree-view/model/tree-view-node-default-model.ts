import {TreeViewNodeModel} from './tree-view-node.model';

const SHOW_ROUTE = '/';
const EDIT_ROUTE = '/';

export class TreeViewNode implements TreeViewNodeModel {

  // descriptive fields
  public id: number;
  public title: string;
  public description: string;
  public code1: string;
  public code2: string;

  // structural fields
  public children: TreeViewNode[];
  public expanded: boolean;
  public filtered: boolean;
  public focused: boolean;

  public constructor() {}

  /**
   * Identifier of the node.
   * @returns {number}
   */
  public getId() {
    return this.id;
  }

  /**
   * Size of the tree with root this.
   * @returns {number}
   */
  public getSize(): number {
    if (this.filtered) {
      return 0;
    }
    let c = 0;
    this.children.forEach( child => {
      c = c + child.getSize();
    });
    return c + 1;
  }

  /**
   * Show route.
   * @returns {string}
   */
  public getShowRoute() {
    return SHOW_ROUTE;
  }

  /**
   * Show route.
   * @returns {string}
   */
  public getEditRoute() {
    return EDIT_ROUTE;
  }

  /**
   * Toggle expanded.
   */
  public toggle() {
    this.expanded = !this.expanded;
  }

  /**
   * Set the expand value for the tree with root this.
   * @param node
   * @param value
   */
  public expand(value) {
    this.expanded = value;
    this.children.forEach(child => child.expand(value));
  }

  /**
   * Set the value of the property filtered for each node of the tree.
   * @param {TreeViewNode} node
   * @param {boolean} force
   * @param {boolean} value
   */
  public filter(term: string, force: boolean = false, value: boolean) {

    console.log(this);
    console.log(term);

    this.filtered = false;

    // forcing a value for the node and all the children recoursively.
    if (force) {
      this.filtered = value;
      this.children.forEach(child => {
        child.filter(term, force, value);
      });
      return;
    }

    // filtered without any proof.
    let filtered = true;

    // looking for a proof.
    if (filtered && this.description) {
      filtered = (this.description.toLowerCase().indexOf(term) === -1);
    }
    if (filtered && this.title) {
      filtered = (this.title.toLowerCase().indexOf(term) === -1);
    }
    if (filtered && this.code1) {
      filtered = (this.code1.toLowerCase().indexOf(term) === -1);
    }
    if (filtered && this.code2) {
      filtered = (this.code2.toLowerCase().indexOf(term) === -1);
    }

    console.log(filtered);
    // matching: keeping the node and all his children.
    if (!filtered) {
      this.filtered = filtered;
      this.children.forEach(child => {
        child.filter(term, true, false);
      });
      return;
    }

    // not matching: keeping the node if at least one children is matching.
    this.children.forEach(child => {
      child.filter(term, false, false);
      if (!child.filtered) {
        filtered = false;
      }
    });
    this.filtered = filtered;
  }

  public getIndentation(indent) {
    return indent * 2 + 'em';
  }


}
