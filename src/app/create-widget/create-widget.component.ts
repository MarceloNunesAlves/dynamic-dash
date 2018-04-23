import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MetricService } from '../services/metric.service';
import { SiteService } from '../services/site.service';
import { NodeService } from '../services/node.service';
import { GroupService } from '../services/group.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ChartComponent } from '../chart/chart.component';
import { SubItem, Metric, DataSourceOrigin } from '../services/flex4.clazz';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RowView, Dashboard } from '../services/dash.clazz';
import { WidgetComponent } from '../widget/widget.component';
import { WidgetService } from '../services/widget.service';
import { RowViewService } from '../services/rowview.service';

@Component({
  selector: 'app-create-widget',
  templateUrl: './create-widget.component.html',
  styleUrls: ['./create-widget.component.css']
})
export class CreateWidgetComponent implements OnInit {

  idDash: number;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  selectedFlex4: boolean = false;
  sortDesc: boolean = false;

  formCreateGraph: FormGroup;
  fb: FormBuilder;
  route: ActivatedRoute;
  router: Router;

  // Enter, comma
  // separatorKeysCodes = [ENTER, COMMA];
  separatorKeysCodes = [ENTER];
  chipControl: FormControl = new FormControl();
  autoCompleteControl: FormControl = new FormControl();

  /* Serviços */
  serviceMetric: MetricService;
  serviceSite: SiteService;
  serviceGroup: GroupService;
  serviceNode: NodeService;
  serviceWidget: WidgetService;
  serviceRowView: RowViewService;

  /*Dados do filtro*/
  options = [];
  listMetricWithType: Metric[] = [];
  listMetricOther: Metric[] = [];
  listNodes: SubItem[] = [];
  listSites: SubItem[] = [];
  listGroups: SubItem[] = [];

  /* Itens selecionados */
  optionFilter = [];

  /*Dados do chart*/
  @Input() widget: WidgetComponent;

  @ViewChild('chart_template') chart: ChartComponent;

  constructor(serviceMetric: MetricService, serviceSite: SiteService,
    serviceGroup: GroupService, serviceNode: NodeService, fb: FormBuilder,
    serviceWidget: WidgetService, serviceRowView: RowViewService, route: ActivatedRoute, router: Router) {
    this.serviceMetric = serviceMetric;
    this.serviceSite = serviceSite;
    this.serviceGroup = serviceGroup;
    this.serviceNode = serviceNode;
    this.serviceWidget = serviceWidget;
    this.serviceRowView = serviceRowView;
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.widget = new WidgetComponent(serviceWidget, null);
    this.widget.height = '250px';
    this.widget.columnLayout = '1';
    this.changeCol();

    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        serviceWidget.get(id).subscribe(res => {
          this.widget = res;
          this.widget.optionGraph.forEach(item => this.addItem(item));
          this.chart.createGraph();
        });
      }
      this.idDash = params['idDash'];
    });

    this.formCreateGraph = new FormGroup({
      id: new FormControl(),
      caption: new FormControl(),
      height: new FormControl(),
      columnLayout: new FormControl(),
      items: this.fb.array([])
    });
  }

  salvarWidget(event) {
    event.preventDefault();

    // Preencher itens do widget
    this.widget.optionGraph = [];
    this.optionGraph.value.forEach((element, index) => {
      element.position = index + 1;
      this.widget.optionGraph.push(element);
    });

    if (this.widget.id) {
      // Alteração
      this.serviceWidget.post(this.widget).subscribe();
    } else {
      // Inclusão
      const dashSel: Dashboard = new Dashboard();
      dashSel.id = this.idDash;
      const rowView: RowView = new RowView(dashSel, [this.widget]);
      this.serviceRowView.post(rowView).subscribe();
    }
    this.router.navigateByUrl('/board/' + this.idDash);
  }

  createItem(m: Metric): FormGroup {
    return this.fb.group(m);
  }

  addSerie(event, chart: ChartComponent) {
    event.preventDefault();

    let mAux: Metric;
    this.optionFilter.forEach(elemItem => {
      if (!elemItem.origin) {
        mAux = Object.assign({}, elemItem);
        mAux.options = [];
      } else {
        mAux.options.push(elemItem);
      }
    });

    mAux.position = this.optionGraph.value.length + 1;
    this.addItem(mAux);

    this.optionFilter = [];
    this.selectedFlex4 = false;
    this.resertList();
    this.executarGraph(chart);
  }

  addItem(m: Metric) {
    let formGroupItem = this.fb.group({
      id: m.id, met_id: m.met_id, name: m.name,
      tituloSerie: m.tituloSerie, ndt_id: m.ndt_id,
      unit_type: m.unit_type, color: m.color,
      position: m.position, ori: m.ori,
      options: this.fb.array(m.options)
    });
    this.optionGraph.push(formGroupItem);
    this.sortItems();
  }

  sortItems() {
    if (!this.widget.id) {
      this.optionGraph.patchValue(this.optionGraph.value.sort((obj1, obj2) => {
        if (obj1.unit_type > obj2.unit_type) {
          return this.sortDesc ? -1 : 1;
        }
        if (obj1.unit_type < obj2.unit_type) {
          return this.sortDesc ? 1 : -1;
        }
        return 0;
      }));
    } else {
      this.optionGraph.patchValue(this.optionGraph.value.sort((obj1, obj2) => {
        if (obj1.position > obj2.position) {
          return this.sortDesc ? -1 : 1;
        }
        if (obj1.position < obj2.position) {
          return this.sortDesc ? 1 : -1;
        }
        return 0;
      }));
    }
  }

  changeSort(event, chart: ChartComponent) {
    event.preventDefault();
    this.sortDesc = !this.sortDesc;
    this.sortItems();
    this.executarGraph(chart);
  }

  get optionGraph(): FormArray {
    return this.formCreateGraph.get('items') as FormArray;
  }

  executarGraph(chart: ChartComponent) {
    chart.caption = this.widget.caption;
    chart.createGraph();
  }

  removerSerie(event, index, chart: ChartComponent) {
    event.preventDefault();

    this.optionGraph.removeAt(index);
    this.executarGraph(chart);
  }

  ngOnInit() {
    this.serviceMetric.lista().subscribe(listMetric => {
      this.listMetricWithType = listMetric;
    });

    let mOther: Metric = {id: 0,
      met_id: '', name: 'TPS médio', tituloSerie: 'TPS médio',
      color: '', position: 0, ndt_id: '',
      unit_type: 'TPS', options: [],
      ori: DataSourceOrigin.OTHER};
    this.listMetricOther.push(mOther);
    this.resertList();
  }

  resertList() {
    if (this.selectedFlex4) {
      this.options = [
        { name: '&ComElemento:' },
        { name: '&SemElemento:' },
        { name: '&ComGrupo:' },
        { name: '&SemGrupo:' },
        { name: '&ComSite:' },
        { name: '&SemSite:' }
      ];
    } else {
      this.options = [
        { name: 'flex4:' },
        { name: 'mir:' }
      ];
    }
  }

  selectOption(event: MatAutocompleteSelectedEvent, textoFiltro) {
    if (textoFiltro.value.includes(':')) {
      let indexPoint = textoFiltro.value.indexOf(':');
      textoFiltro.value = textoFiltro.value.substr(0, (indexPoint + 1)) + event.option.value.name;
    } else {
      textoFiltro.value = event.option.value.name;
    }
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    let cleanField: boolean = false;

    // Adiciona o filtro
    if ((value || '').trim()) {
      value = value.toLowerCase();
      if (value.includes('flex4:') && value.length > 6) {
        /* Adiciona item no filtro */
        value = value.replace('flex4:', '');
        let metricAdd = this.listMetricWithType.filter(reg => reg.name.toLowerCase() === value)[0];
        if (metricAdd) {
          metricAdd = JSON.parse(JSON.stringify(metricAdd));
          this.optionFilter.push(metricAdd);
          /* Carrega subitens */
          this.loadDataMetric(metricAdd);

          this.selectedFlex4 = true;
          value = '';
          cleanField = true;
        }
      } else if (value.includes('mir:') && value.length > 4) {
          /* Adiciona item no filtro */
          value = value.replace('mir:', '');
          let metricAdd = this.listMetricOther.filter(reg => reg.name.toLowerCase() === value)[0];
          if (metricAdd) {
            metricAdd = JSON.parse(JSON.stringify(metricAdd));
            this.optionFilter.push(metricAdd);
            value = '';
            cleanField = true;
          }
      } else if (value.includes('&com') || value.includes('&sem')) {
        let valueAux = value;
        let objFilter: SubItem;
        if (value.includes('&comelemento:')) {
          valueAux = valueAux.replace('&comelemento:', '');
          objFilter = this.listNodes.filter(reg => reg.name.toLowerCase() === valueAux)[0];
          objFilter.com = true;
        } else if (value.includes('&comgrupo:')) {
          valueAux = valueAux.replace('&comgrupo:', '');
          objFilter = this.listGroups.filter(reg => reg.name.toLowerCase() === valueAux)[0];
          objFilter.com = true;
        } else if (value.includes('&comsite:')) {
          valueAux = valueAux.replace('&comsite:', '');
          objFilter = this.listSites.filter(reg => reg.name.toLowerCase() === valueAux)[0];
          objFilter.com = true;
        } else if (value.includes('&semelemento:')) {
          valueAux = valueAux.replace('&semelemento:', '');
          objFilter.com = false;
          objFilter = this.listNodes.filter(reg => reg.name.toLowerCase() === valueAux)[0];
        } else if (value.includes('&semgrupo:')) {
          valueAux = valueAux.replace('&semgrupo:', '');
          objFilter = this.listGroups.filter(reg => reg.name.toLowerCase() === valueAux)[0];
          objFilter.com = false;
        } else if (value.includes('&semsite:')) {
          valueAux = valueAux.replace('&semsite:', '');
          objFilter = this.listSites.filter(reg => reg.name.toLowerCase() === valueAux)[0];
          objFilter.com = false;
        }
        if (objFilter) {
          this.optionFilter.push(objFilter);
          cleanField = true;
        }
      }

    }

    // Reset the input value
    if (cleanField) {
      input.value = '';
    } else if (value === '') {
      this.resertList();
    }

  }

  loadDataMetric(metric) {
    this.serviceSite.listaByFilter(metric).subscribe(list => {
      this.listSites = list;
    });

    this.serviceNode.listaByFilter(metric).subscribe(list => {
      this.listNodes = list;
    });

    this.serviceGroup.listaByFilter(metric).subscribe(list => {
      this.listGroups = list;
    });
  }

  verifList(event, texto: string) {
    event.preventDefault();

    if (this.selectedFlex4) {
      if (texto.toLowerCase().includes('elemento:')) {
        this.options = this.listNodes;
      } else if (texto.toLowerCase().includes('grupo:')) {
        this.options = this.listGroups;
      } else if (texto.toLowerCase().includes('site:')) {
        this.options = this.listSites;
      } else if (this.optionFilter.length === 0) {
        this.selectedFlex4 = false;
        this.resertList();
      } else {
        this.resertList();
      }
    } else {
      if (texto.toLowerCase().includes('flex4:')) {
        this.options = this.listMetricWithType;
      } else if (texto.toLowerCase().includes('mir:')) {
          this.options = this.listMetricOther;
      } else {
        this.resertList();
      }
    }
  }

  remove(filtro: any): void {
    let index = this.optionFilter.indexOf(filtro);

    if (index >= 0) {
      this.optionFilter.splice(index, 1);
    }
  }

  changeCol(): void {
    if (this.widget.columnLayout === '1') {
      this.widget.classCol = 'col-lg-12';
    } else if (this.widget.columnLayout === '2') {
      this.widget.classCol = 'col-lg-6 col-md-12';
    } else {
      this.widget.classCol = 'col-lg-4 col-md-6 col-sm-12';
    }
  }
}
