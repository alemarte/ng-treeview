import {Injectable} from '@angular/core';

@Injectable()
export class TreeViewConfig {

  // icons
  expandFaIcon = 'plus';
  reduceFaIcon = 'minus';
  leafFaIcon = 'circle-thin';

  // buttons
  expandBootstrapColor = 'info';
  expandBootstrapText = 'light';

  reduceBootstrapColor = 'info';
  reduceBootstrapText = 'light';

  // filter
  filterPlaceholder = 'Search';

  // tree
  iconBootstrapColor = 'info';

  itemViewColor = 'secondary';
  itemEditColor = 'secondary';

  countMessage = function(count) {
    return 'shown ' + count + ' elements';
  };


}
