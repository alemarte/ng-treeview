# Awesome Angular 4 ng-treeview 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.
It is in a very early stage so issue reports and pull request will be really appreciate.

## Demo

npm install

ng serve

*Online demo is upcoming.*

## Installation

```bash
npm install ng-treeview
```

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgTreeViewModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Basic usage

NgTreeView comes with a basic template system based on [Bootstrap 4](https://getbootstrap.com/) and [Font Awesome](http://fontawesome.io/).

```html
<ng-tree-view [tree]="tree"></ng-tree-view>
```
The tree property is of type TreeViewModel which is an interface that gives you method for managing the tree.

The library comes with the TreeView class that is the default implementation. You can instantiate it with the following instructions:

```javascript
// instantiate the tree
const tree = new TreeView();
// pass the nodes of the tree (an array of TreeViewNode)
tree.withNodes(nodes);
```
The last missing piece of information is the TreeViewNodeModel interface that gives instead method for managing the node and define the hierarchical structure of the tree.
The class TreeViewNode is the default implementation.

```javascript
const node = new TreeViewNode();
node.setId('1')
    .setTitle('Europe')
    .setExpanded(true)
    .setChildren(children); // children: TreeViewNode[]
```  
You'll find examples in the src/app/demo folder.

## Custom template

You can entirely rewrite the template from scratch following this steps.

1) Extend the TreeViewNode class by adding your custom fields of your own data model and optionally by overriding the filterCondition implementation in order to take them into account when the filter operation will be performed.

```typescript
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
    if (this.title && this.title.toLowerCase().indexOf(term) !== -1) {
      return true;
    }
    if (this.code && (this.code.toLowerCase().indexOf(term) !== -1)) {
      return true;
    }
    return false;
  }

}

```

2) Optionally define the template for the header where you can easily take advantages of some features like filtering and expand/collapse all. 

```html


<!-- Custom Header Definition Starter -->

<ng-template #customHeaderTemplate
             let-tree="tree">
     
      <!-- Number of current filtered nodes -->
      {{ tree.getSize() }}

      <!-- Event handlers -->
      <input (input)="tree.onFilterInput($event)">
      <button (click)="tree.onExpandTree()""> Expand </button>
      <button (click)="tree.onCollapseTree()"> Collapse </button>

</ng-template>
```

3) Define the template for the single node of the tree, and how recursively you intend to draw the children. 

```html
<!-- Custom Node Definition Starter -->

<ng-template #customTemplate let-node="node">
  <div *ngIf="node.isFiltered()">
  
   <!-- Useful method provided by the interface -->
   {{ node.isFiltered() }}
   {{ node.isExpanded() }} 
   <div (click)="node.toggle()">Toggle expanded</div>

   <!-- For styling purpose you could need to know those information -->
   {{ node.getLevel() }}
   {{ node.isFirst() }}
   {{ node.isLast() }}

   <!-- Render custom fields -->
   {{ node.code }}
   {{ node.img }}
  
   <!-- You can do routing inside the custom template -->
   <button *ngIf="node.getShowRoute()" [routerLink]="[node.getShowRoute()]">
  
   <!-- You can render other components inside the template -->
   <my-component></my-component>
   
   <!-- If the node is expanded remember to recursively draw the children! -->
   <div  *ngIf="node.isExpanded()" >
    <div *ngFor="let child of node.getChildren()">
      <ng-tree-view-node
        [treeViewNodeTemplate]="customTemplate"
        [node]="child"
      ></ng-tree-view-node>
    </div>
   </div>
   
  <div>
</ng-template>
```
4) The TreeView instance.

```html
<ng-tree-view [tree]="tree"
           [treeViewHeaderTemplate]="customHeaderTemplate"
           [treeViewNodeTemplate]="customTemplate"
           ></ng-tree-view>
```

## TODO List
1. Css customization of Basic Template.
2. *focusId property* in order to apply different style and scroll towards the focused node of the tree.
3. *filter property* in order to initialize the tree with a filter term.
4. Tests and CI process.

