import { Input } from '@angular/core';

export class SubItem {
    @Input() id: string;
    @Input() name: string;
    @Input() com: boolean;
    @Input() color: string = this.com ? 'primary' : 'warn';
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
    @Input() color: string = '';
    ndt_id: string;
    unit_type: string;
    options: SubItem[];
}

export class DetailChart {
    listValues: ValueSerie[];
    detailSerie: DetailSerie;

    constructor(detailSerie: DetailSerie, listValues: ValueSerie[]) {
        this.detailSerie = detailSerie;
        this.listValues = listValues;
    }
}

export class DetailSerie {
    name: string;
    cod: string;

    constructor(name: string, cod: string) {
        this.name = name;
        this.cod = cod;
    }
}

export class ValueSerie {
    time: Date;
    value: string;

    constructor(time: Date, value: string) {
        this.time = time;
        this.value = value;
    }
}
