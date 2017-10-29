import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TreeViewNode } from './tree-view-node.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-tree-view',
    templateUrl: './tree-view.component.html'
})
export class TreeViewComponent implements OnInit, OnChanges {

    @Input() nodes: Array<TreeViewNode>;

    @Input() focusOnNode;

    @Input() expand = false;
    @Input() collapse = false;

    onFiltering: Subject<string> = new Subject();
    filter;
    count: number = null;

    constructor() {}

    ngOnInit() {
        console.log('Sto inizializzando il tree...');
        this.onFiltering.debounceTime(400).subscribe(
            x => this.filterTree(x)
        );
        this.scrollToAnchor(this.focusOnNode, 0);
    }

    ngOnChanges(change) {
        console.log('Sto eseguendo la ngOnChanges ...');
        // console.log(change);
        if (this.count === null && this.nodes) {
            console.log('Sto inizializzando il numero di nodi ...');
            this.count = this.countTree(this.nodes);
        }
    }

    public onExpandTree() {
        this.expand = true;
        this.collapse = false;
        console.log('Sto espandendo il tree...');
        this.nodes.forEach(node => node.expand(true));
    }

    public onReduceTree() {
        this.expand = false;
        this.collapse = true;
        console.log('Sto riducendo il tree...');
        this.nodes.forEach(node => node.expand(false));
    }

    public onFilterInput(e) {
        this.onFiltering.next(e.target.value);
    }

    /**
     * Un nodo viene selezionato se esso o almeno uno dei figli rispetta il filtro.
     * @param {string} filter
     */
    public filterTree(filter: string) {
        console.log('Sto filtrando i nodi da visualizzare...');
        this.filter = filter;
        this.nodes.forEach(node => {
            node.filter(this.filter, false, false);
        });
        this.count = this.countTree(this.nodes);
    }

    /**
     * Il numero di nodi dell'albero.
     * @param {TreeViewNode[]} nodes
     * @returns {number}
     */
    private countTree(nodes: TreeViewNode[]) {
        console.log('Sto contando il numero di nodi visualizzati...');
        let c = 0;
        nodes.forEach(node => c = c + node.size());
        return c;
    }

    /**
     * Utility per effettuare lo scroll sull'element con id location.
     * @param {string} location
     * @param {number} wait
     */
    private scrollToAnchor(location: string, wait: number): void {
        setTimeout(() => {
            const element = document.querySelector('#n' + location);
            if (element) {
                const elementRect = element.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;
                const middle = absoluteElementTop - (window.innerHeight / 2);
                window.scrollTo(0, middle);
            }
        }, wait);
    }
}
