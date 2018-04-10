import { Component, OnInit, Input } from '@angular/core';
import { MetricService } from '../services/metric.service';
import { DetailChart, ValueSerie, Metric } from '../services/flex4.clazz';
import * as FusionCharts from 'fusioncharts';
import { FormArray } from '@angular/forms';
import { element } from 'protractor';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    constructor(serviceMetric: MetricService) {
        this.serviceMetric = serviceMetric;
    }

    serviceMetric: MetricService;

    /* Atributo dos gráficos */
    id: string;
    @Input() height: string;
    @Input() caption: string = '';
    @Input() classCol: string = '';
    @Input() optionGraph: Metric[] = [];

    /* Atributos transient */
    width: string = '100%';
    type: string = 'mscombidy2d';
    dataFormat: string = 'json';
    dataSource: Chart = new Chart();

    /* Opções de filtro */
    @Input() optionArray: FormArray;

    listData: DetailChart[];

    ngOnInit() {
    }

    createGraph() {
        /* Limpa a lista */
        this.listData = [];
        if (this.optionArray) {
            this.optionGraph = [];
            this.optionArray.value.forEach(element => {
                this.optionGraph.push(element as Metric);
            });
        }

       /*Executa a consulta de dados da serie*/
        this.serviceMetric.values(this.optionGraph).subscribe(dataGraph => {
            dataGraph.forEach(item => {
                this.listData.push(item);
            });
            this.executarGraph();
        });
    }

    executarGraph() {
        let chart: Chart = new Chart();
        chart.caption = this.caption;
        chart.labeldisplay = 'STAGGER';
        chart.numberprefix = '';
        chart.theme = 'fint';

        let firstSerie: boolean = true;
        let different: boolean = false;
        let yaxisname: string = '';

        this.listData.forEach(detail => {
            let dataSerie: DataSerie[] = [];
            let categoryChart: Category[] = [];
            detail.listValues.forEach(itemValue => {
                if (firstSerie) {
                    categoryChart.push(new Category(this.formatTime(itemValue.time)));
                    chart.pyaxisname = detail.detailSerie.unit_type;
                    yaxisname = chart.pyaxisname;
                }
                dataSerie.push(new DataSerie(itemValue.value));
            });
            chart.categories.push(new Categories(categoryChart));
            let objDetailSerie = new Dataset(detail.detailSerie.name, dataSerie);

            if ((yaxisname !== detail.detailSerie.unit_type && !different) || different) {
                objDetailSerie.parentyaxis = 'S';
                objDetailSerie.renderas = 'line';
                chart.syaxisname = detail.detailSerie.unit_type;
                chart.slantlabels = '1';
                different = true;
            }

            chart.dataset.push(objDetailSerie);

            firstSerie = false;
            yaxisname = detail.detailSerie.unit_type;
        });
        this.dataSource = chart;
    }
    formatTime(dtStr: string): string {
        let dt: Date = new Date(dtStr);
        return ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2);
    }

}

export class Chart {
    caption: string;
    subcaption: string;
    labeldisplay: string;
    xaxisname: string;
    pyaxisname: string;
    syaxisname: string;
    slantlabels: string;
    bgcolor: string = 'FFFFFF';
    plotgradientcolor: string = '';
    showalternatehgridcolor: string = '0';
    showplotborder: string = '0';
    divlinecolor: string = 'CCCCCC';
    showvalues: string = '0';
    showcanvasborder: string = '0';
    numberprefix: string = '';
    canvasborderalpha: string = '0';
    legendshadow: string = '0';
    legendborderalpha: string = '0';
    showborder: string = '0';
    theme: string;
    categories: Categories[] = [];
    dataset: Dataset[] = [];
}

export class Categories {
    category: Category[];

    constructor(category: Category[]) {
        this.category = category;
    }
}

export class Category {
    label: string;

    constructor(label: string) {
        this.label = label;
    }
}

export class Dataset {
    seriesname: string;
    renderas: string;
    parentyaxis: string;
    data: DataSerie[];

    constructor(seriesname: string, data: DataSerie[]) {
        this.seriesname = seriesname;
        this.data = data;
    }
}

export class DataSerie {
    value: string;
    constructor(value: string) {
        this.value = value;
    }
}
