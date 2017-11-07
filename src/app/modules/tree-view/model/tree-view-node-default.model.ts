import {TreeViewNodeModel} from './tree-view-node.model';
import {TreeViewModel} from './tree-view.model';

export class TreeViewNode implements TreeViewNodeModel {

  private tree: TreeViewModel;

  private id: number;
  private level: number;
  private children: TreeViewNodeModel[];
  private expanded: boolean;
  private filtered = true;
  private showRoute: string;
  private editRoute: string;

  public title: string;

  public constructor() {}

  public getId() {
    return this.id;
  }

  public setId(value): TreeViewNodeModel {
    this.id = value;
    return this;
  }

  public getChildren(): TreeViewNodeModel[] {
    return this.children;
  }

  public setChildren(children: TreeViewNodeModel[]): TreeViewNodeModel {
    this.children = children;
    return this;
  }

  public getSize(): number {
    if (!this.filtered) {
      return 0;
    }
    let c = 0;
    this.children.forEach( child => {
      c = c + child.getSize();
    });
    return c + 1;
  }

  public getLevel(): number {
    return this.level;
  }

  public setLevel(level: number): TreeViewNodeModel {
    this.level = level;
    return this;
  }

  public isExpanded(): boolean {
    return this.expanded;
  }

  public setExpanded(value: boolean): TreeViewNodeModel {
    this.expanded = value;
    return this;
  }

  public isFiltered(): boolean {
    return this.filtered;
  }

  public setFiltered(value: boolean): TreeViewNodeModel {
    this.filtered = value;
    return this;
  }

  public getShowRoute() {
    return this.showRoute;
  }

  public setShowRoute(value: string): TreeViewNodeModel {
    this.showRoute = value;
    return this;
  }

  public getEditRoute() {
    return this.editRoute;
  }

  public setEditRoute(value: string): TreeViewNodeModel {
    this.editRoute = value;
    return this;
  }

  public toggle(): TreeViewNodeModel {
    this.expanded = !this.expanded;
    return this;
  }

  public expand(value): TreeViewNodeModel {
    this.expanded = value;
    this.children.forEach(child => child.expand(value));
    return this;
  }

  public filter(term: string): TreeViewNodeModel {
    this.filterImpl(term, false, false);
    return this;
  }

  protected filterImpl(term: string, force: boolean = false, value: boolean) {

    // forcing a value for the node and all the children recoursively.
    if (force) {
      this.filtered = value;
      this.children.forEach((child: TreeViewNode) => {
        child.filterImpl(term, force, value);
      });
      return;
    }

    // looking for a proof.
    this.filtered = this.filterCondition(term);

    // matching: keeping the node and all his children.
    if (this.filtered) {
      this.children.forEach((child: TreeViewNode) => {
        child.filterImpl(term, true, true);
      });
      return;
    }

    // not matching: keeping the node if at least one children is matching.
    this.children.forEach((child: TreeViewNode) => {
      child.filterImpl(term, false, false);
      if (child.filtered) {
        this.filtered = true;
        return;
      }
    });
  }

  protected filterCondition(term): boolean {
    if (this.title.toLowerCase().indexOf(term) !== -1) {
      return true;
    }
    return false;
  }

  public getTree(): TreeViewModel {
    return this.tree;
  }

  public setTree(tree: TreeViewModel): TreeViewNodeModel {
    this.tree = tree;
    return this;
  }

  public isFirst(): boolean {
    if (this.tree) {
      return <TreeViewNodeModel>this === this.tree.getFirst();
    } else {
      return false;
    }
  }

  public isLast(): boolean {
    if (this.tree) {
      return <TreeViewNodeModel>this === this.tree.getLast();
    } else {
      return false;
    }
  }

  public styles() {
    return {
      'padding-left': this.getLevel() * 2 + 'em'
    };
  }

  public classes(focusId) {
    return {
      'first-item': this.isFirst(),
      'last-item': this.isLast(),
      'middle-item': !this.isFirst() && !this.isLast(),
      'focus-item': focusId === this.getId()
    };
  }

}
