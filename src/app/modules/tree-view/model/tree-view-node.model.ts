export interface TreeViewNodeModel {

  children: TreeViewNodeModel[];
  expanded: boolean;
  filtered: boolean;
  focused: boolean;

  getId(): any;
  getSize(): number;

  getShowRoute(): string;
  getEditRoute(): string;

  toggle(): void;
  expand(value: boolean): void;
  filter(term: string, force: boolean, value: boolean): void;

}
