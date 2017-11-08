import {TreeViewCustomNode} from '../custom/model/tree-view-node-custom-model';
import {TreeView} from '../../modules/tree-view/model/tree-view-default.model';
import {TreeViewNode} from '../../modules/tree-view/model/tree-view-node-default.model';

const examples = {
  customTree: function(): TreeView {
    const tree = new TreeView();
    tree.withNodes(data.map( root => buildCustomNode(root)));
    return tree;
  },
  defaultTree: function(): TreeView {
    const tree = new TreeView();
    tree.withNodes(data.map( root => buildDefaultNode(root)));
    return tree;
  },
}

export default examples;

const data = [
  {
    id: 1,
    title: 'Europe',
    code: 'EU',
    img: '../../../assets/europe.png',
    children: [
      {
        id: 2,
        title: 'Italy',
        code: 'ITA',
        img: '../../../assets/italy.png',
        children: [
          {
            id: 3,
            title: 'Rome',
            children: [

            ]
          },
          {
            id: 4,
            title: 'Milan',
            children: [

            ]
          }
        ]
      },
      {
        id: 5,
        title: 'England',
        code: 'ENG',
        img: '../../../assets/england.png',
        children: [

        ]
      }
    ]
  }
];

const buildCustomNode = function(item): TreeViewCustomNode {

  const node = new TreeViewCustomNode();
  node.setId(item.id);

  node.setFiltered(true);
  node.setExpanded(true);
  node.setChildren(item.children.map( child => buildCustomNode(child)));

  node.title = item.title;
  node.code = item.code;
  node.img = item.img;

  return node;
};

const buildDefaultNode = function(item): TreeViewNode {
  const node = new TreeViewNode();

  node.setId(item.id)
    .setFiltered(true)
    .setExpanded(true)
    .setChildren(item.children.map( child => buildDefaultNode(child)));

  node.title = item.title;

  return node;
};






