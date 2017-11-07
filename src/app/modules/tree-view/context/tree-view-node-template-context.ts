import {TreeViewNodeModel} from '../model/tree-view-node.model';

/**
 * Context for the tree view node template in case you want to override the default one.
 */
export interface TreeViewNodeTemplateContext {

  node: TreeViewNodeModel;

  focusId: number;

}
