import {TreeViewModel} from './tree-view.model';

export interface TreeViewNodeModel {

  /**
   * Identifier of the node.
   * @returns {number}
   */
  getId(): any;

  /**
   * Set the identifier of the node.
   * @param value
   * @returns {TreeViewNodeModel}
   */
  setId(value): TreeViewNodeModel;

  /**
   * Children of the node.
   * @returns {TreeViewNode[]}
   */
  getChildren(): TreeViewNodeModel[];

  /**
   * Set the children of the node.
   * @returns {TreeViewNode[]}
   */
  setChildren(children: TreeViewNodeModel[]): TreeViewNodeModel;

  /**
   * Size of the tree with root this.
   * @returns {number}
   */
  getSize(): number;

  /**
   * The hierarchical level.
   * @returns {number}
   */
  getLevel(): number;

  /**
   * Set the hierarchical level.
   * @param {number} level
   * @returns {TreeViewNodeModel}
   */
  setLevel(level: number): TreeViewNodeModel;

  /**
   * If the node is currently expanded.
   * @returns {boolean}
   */
  isExpanded(): boolean;

  /**
   * Set the expanded value of the node.
   * @param {boolean} value
   * @returns {TreeViewNodeModel}
   */
  setExpanded(value: boolean): TreeViewNodeModel;

  /**
   * If the node is currently filtered.
   * @returns {boolean}
   */
  isFiltered(): boolean;

  /**
   * Set the filtered value of the node.
   * @param {boolean} value
   * @returns {TreeViewNodeModel}
   */
  setFiltered(value: boolean): TreeViewNodeModel;

  /**
   * Show route.
   * @returns {string}
   */
  getShowRoute(): string;

  /**
   * Set the show route.
   * @returns {string}
   */
  setShowRoute(value: string): TreeViewNodeModel;

  /**
   * Edit route.
   * @returns {string}
   */
  getEditRoute(): string;

  /**
   * Set the edit route.
   * @returns {string}
   */
  setEditRoute(value: string): TreeViewNodeModel;

  /**
   * Toggle expanded.
   */
  toggle(): TreeViewNodeModel;

  /**
   * Set the expand value for the tree with root this.
   * @param node
   * @param value
   */
  expand(value: boolean): TreeViewNodeModel;

  /**
   * Set the value of the property filtered for each node of the tree with root this.
   * @param {TreeViewNode} node
   * @param {boolean} force
   * @param {boolean} value
   */
  filter(term: string): TreeViewNodeModel;

  /**
   * The tree which the node belong to.
   * @returns {TreeViewModel}
   */
  getTree(): TreeViewModel;

  /**
   * Set the tree which the node belong to.
   * @returns {TreeViewModel}
   */
  setTree(tree: TreeViewModel): TreeViewNodeModel;

  /**
   * First rendered node.
   * @returns {boolean}
   */
  isFirst(): boolean;

  /**
   * Last rendered node.
   * @returns {boolean}
   */
  isLast(): boolean;

  /**
   * Css classes.
   */
  classes(... args: any[]);

  /**
   * Css styles.
   * @param indent
   */
  styles(... args: any[]);


}
