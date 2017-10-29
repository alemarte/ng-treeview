export class TreeViewNode {

    public id: number;
    public title: string;
    public description: string;
    public code1: string;
    public code2: string;

    public date1: string;
    public date2: string;

    public children: TreeViewNode[];
    public expanded: boolean;
    public filtered: boolean;
    public focused: boolean;

    public edit: string;

    public constructor() {}

    /**
     * Trasformazione da dto a gerarchia utilizzata nel tree-view.
     * @param item
     * @param level
     * @param focusedId
     * @returns {TreeViewNode}
     */
    public static buildForEntitaorganizzativa(item, level, focusedId): TreeViewNode {

        const node = new TreeViewNode();
        node.id = node.id = item.entitaorganizzativa.id;

        node.code1 = item.entitaorganizzativa.cdsuo;

        // la descripion dipende da che livello sono
        if (level === 0 || level === 1) {
            node.title = item.entitaorganizzativa.sigla;
            node.description = item.entitaorganizzativa.denominazione;
        } else {
            node.description = item.entitaorganizzativa.denominazionebreve;
            node.code2 = item.entitaorganizzativa.idnsip;
        }

        node.date1 = item.entitaorganizzativa.iniziovalidita;
        node.date2 = item.entitaorganizzativa.finevalidita;

        node.children = item.children.map( child =>
            TreeViewNode.buildForEntitaorganizzativa(child, level + 1, focusedId));

        node.edit = '/admin/entitaorganizzative/show/' + item.entitaorganizzativa.id;

        node.filtered = false;

        node.children.forEach( child => {
            if (child.expanded) {
                node.expanded = true;
            }
        })

        if (focusedId === node.id) {
            node.expanded = true;
            node.focused = true;
        }

        return node;
    }

    public toggle() {
        this.expanded = !this.expanded;
    }

    /**
     * Dimensione dell'albero con radice this.
     * @returns {number}
     */
    public size(): number {
        if (this.filtered) {
            return 0;
        }
        let c = 0;
        this.children.forEach( child => {
            c = c + child.size();
        });
        return c + 1;
    }

    /**
     * Imposta il valore nodo espanso/collassato.
     * @param node
     * @param value
     */
    public expand(value) {
        this.expanded = value;
        this.children.forEach(child => child.expand(value));
    }

    /**
     * Imposta il valore filtered in this.
     * @param {TreeViewNode} node
     * @param {boolean} force
     * @param {boolean} value
     */
    public filter(term: string, force: boolean = false, value: boolean) {

        this.filtered = false;

        // forzo un valore
        if (force) {
            this.filtered = value;
            this.children.forEach(child => {
                child.filter(term, force, value);
            });
            return;
        }

        // filtrato fino a prova contraria
        let filtered = true;

        if (filtered && this.description) {
            filtered = (this.description.toLowerCase().indexOf(term) === -1);
        }
        if (filtered && this.title) {
            filtered = (this.title.toLowerCase().indexOf(term) === -1);
        }
        if (filtered && this.code1) {
            filtered = (this.code1.toLowerCase().indexOf(term) === -1);
        }
        if (filtered && this.code2) {
            filtered = (this.code2.toLowerCase().indexOf(term) === -1);
        }

        // matching: tengo lui e tutti i figli.
        if (!filtered) {
            this.filtered = filtered;
            this.children.forEach(child => {
                child.filter(term, true, false);
            });
            return;
        }

        // not matching: lo tengo se almeno un figlio fa matching.
        this.children.forEach(child => {
            child.filter(term, false, false);
            if (!child.filtered) {
                filtered = false;
            }
        });
        this.filtered = filtered;
    }


}
