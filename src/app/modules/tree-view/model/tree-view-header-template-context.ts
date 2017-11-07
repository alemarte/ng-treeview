import {Subject} from 'rxjs/Subject';
import {TreeViewNodeModel} from './tree-view-node.model';

/**
 * Context for the tree view header template in case you want to override the default one.
 */
export interface TreeViewHeaderTemplateContext {

  filter: string;

  count: number;

  onfiltering: Subject<string>;

  nodes: TreeViewNodeModel[];

}
