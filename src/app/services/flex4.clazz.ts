import { Input } from '@angular/core';

export class SubItem {
    @Input() id: string;
    @Input() name: string;
    @Input() com: boolean;
    @Input() color: string = (this.com ? 'primary' : 'warn');
    origin: TypeOrigin;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

enum TypeOrigin {
    NODE,
    GROUP,
    SITE,
}

export class Metric {
    @Input() met_id: string;
    @Input() name: string;
    @Input() tituloSerie: string;
    @Input() color: string = '';
    ndt_id: string;
    unit_type: string;
    options: SubItem[] = [];
}

export class DetailChart {
    listValues: ValueSerie[];
    detailSerie: Metric;

    constructor(detailSerie: Metric, listValues: ValueSerie[]) {
        this.detailSerie = detailSerie;
        this.listValues = listValues;
    }
}

export class ValueSerie {
    time: string;
    value: string;

    constructor(time: string, value: string) {
        this.time = time;
        this.value = value;
    }
}
