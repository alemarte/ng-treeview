import {TreeViewNodeModel} from './tree-view-node.model';

/**
 * Context for the tree view node template in case you want to override the default one.
 */
export interface TreeViewNodeTemplateContext {

  /**
   * Node that corresponds to the template
   */
  node: TreeViewNodeModel;

  indent: number;

  focusOnNode: number;

}
