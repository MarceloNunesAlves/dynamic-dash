import { Component, OnInit, Input } from '@angular/core';
import { MetricService } from '../services/metric.service';
import { DetailChart, DetailSerie, ValueSerie } from '../services/flex4.clazz';
import * as FusionCharts from 'fusioncharts';

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

    /* Opções de filtro */
    @Input() optionGraph: any[] = [];
    listData: DetailChart[];

    /* Atributo dos gráficos */
    id: string;
    width: string;
    height: string;
    type = 'mscombi2d';
    dataFormat = 'json';
    dataSource: Chart = new Chart();

    ngOnInit() {
    }

    createGraph() {
        /* Limpa a lista */
        this.listData = [];
        this.optionGraph.forEach(op => {
            /* Executa a consulta de dados da serie */
            this.serviceMetric.values(op).subscribe(detailChart => {
                this.listData.push(detailChart);
                this.executarGraph();
            });
        });
    }

    executarGraph() {
        let chart: Chart = new Chart();
        chart.caption = 'Grafico de teste';
        chart.subcaption = 'subtitulo';
        chart.xaxisname = 'Tempo';
        chart.yaxisname = 'Volume';
        chart.numberprefix = '';
        chart.theme = 'fint';

        let firstSerie: boolean = true;
        this.listData.forEach(detail => {
            let dataSerie: DataSerie[] = [];
            let categoryChart: Category[] = [];
            detail.listValues.forEach(itemValue => {
                if (firstSerie) {
                    categoryChart.push(new Category(this.formatTime(itemValue.time)));
                }
                dataSerie.push(new DataSerie(itemValue.value));
            });
            chart.categories.push(new Categories(categoryChart));
            chart.dataset.push(new Dataset(detail.detailSerie.name, dataSerie));

            firstSerie = false;
        });

        this.dataSource = chart;
    }
    formatTime(dt: Date): string {
        return ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2);
    }

}

export class Chart {
    caption: string;
    subcaption: string;
    xaxisname: string;
    yaxisname: string;
    numberprefix: string;
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
