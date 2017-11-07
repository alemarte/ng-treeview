import {TreeViewModel} from '../model/tree-view.model';

/**
 * Context for the tree view header template in case you want to override the default one.
 */
export interface TreeViewHeaderTemplateContext {

  filter: string;

  tree: TreeViewModel;
}
