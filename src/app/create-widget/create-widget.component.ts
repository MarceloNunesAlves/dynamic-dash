import { Component, OnInit } from '@angular/core';
import { MetricService } from '../services/metric.service';
import { SiteService } from '../services/site.service';
import { NodeService } from '../services/node.service';
import { GroupService } from '../services/group.service';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { ChartComponent } from '../chart/chart.component';
import { SubItem, Metric } from '../services/flex4.clazz';

@Component({
  selector: 'app-create-widget',
  templateUrl: './create-widget.component.html',
  styleUrls: ['./create-widget.component.css']
})
export class CreateWidgetComponent implements OnInit {

  constructor(serviceMetric: MetricService, serviceSite: SiteService, serviceGroup: GroupService, serviceNode: NodeService) {
    this.serviceMetric = serviceMetric;
    this.serviceSite = serviceSite;
    this.serviceGroup = serviceGroup;
    this.serviceNode = serviceNode;
  }

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  selectedFlex4: boolean = false;

  // Enter, comma
  // separatorKeysCodes = [ENTER, COMMA];
  separatorKeysCodes = [ENTER];
  myControl: FormControl = new FormControl();

  /* Serviços */
  serviceMetric: MetricService;
  serviceSite: SiteService;
  serviceGroup: GroupService;
  serviceNode: NodeService;

  /*Dados do filtro*/
  options = [];
  listMetricWithType: Metric[] = [];
  listNodes: SubItem[] = [];
  listSites: SubItem[] = [];
  listGroups: SubItem[] = [];

  /* Itens selecionados */
  optionFilter = [];

  /*Dados do chart*/
  optionGraph = [];

  executarGraph(chart: ChartComponent) {
    chart.createGraph();
  }

  selectOption(item, inputText) {
    console.log(item);
    inputText.value += item.name;
  }

  addSerie() {
    this.optionGraph = this.optionGraph.concat(this.optionFilter);
    this.optionFilter = [];
    this.selectedFlex4 = false;
    this.resertList();
  }

  ngOnInit() {
    this.serviceMetric.lista().subscribe(listMetric => {
                                                            this.listMetricWithType = listMetric;
                                                        });
    this.resertList();
  }

  resertList() {
    if (this.selectedFlex4) {
      this.options = [
        {name: '&ComElemento:'},
        {name: '&SemElemento:'},
        {name: '&ComGrupo:'},
        {name: '&SemGrupo:'},
        {name: '&ComSite:'},
        {name: '&SemSite:'}
      ];
    } else {
      this.options = [
        {name: 'Flex4:'},
        {name: 'Datasource-MIR:'}
      ];
    }
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Adiciona o filtro
    if ((value || '').trim()) {
      value = value.toLowerCase();
      if ( value.includes('flex4:') ) {
        /* Adiciona item no filtro */
        value = value.replace('flex4:', '');
        let metricAdd = this.listMetricWithType.filter( reg => reg.name.toLowerCase().includes(value))[0];
        this.optionFilter.push(metricAdd);
        /* Carrega subitens */
        this.loadDataMetric(metricAdd);

        this.selectedFlex4 = true;
        value = '';
      } else if (value.includes('&com') || value.includes('&sem')) {
        let valueAux = value;
        let objFilter: SubItem;
        if (value.includes('&comelemento:')) {
          valueAux = valueAux.replace('&comelemento:', '');
          objFilter = this.listNodes.filter( reg => reg.name.toLowerCase().includes(valueAux))[0];
          objFilter.com = true;
        } else if (value.includes('&comgrupo:')) {
          valueAux = valueAux.replace('&comgrupo:', '');
          objFilter = this.listGroups.filter( reg => reg.name.toLowerCase().includes(valueAux))[0];
          objFilter.com = true;
        } else if (value.includes('&comsite:')) {
          valueAux = valueAux.replace('&comsite:', '');
          objFilter = this.listSites.filter( reg => reg.name.toLowerCase().includes(valueAux))[0];
          objFilter.com = true;
        } else if (value.includes('&semelemento:')) {
          valueAux = valueAux.replace('&semelemento:', '');
          objFilter.com = false;
          objFilter = this.listNodes.filter( reg => reg.name.toLowerCase().includes(valueAux))[0];
        } else if (value.includes('&semgrupo:')) {
          valueAux = valueAux.replace('&semgrupo:', '');
          objFilter = this.listGroups.filter( reg => reg.name.toLowerCase().includes(valueAux))[0];
          objFilter.com = false;
        } else if (value.includes('&semsite:')) {
          valueAux = valueAux.replace('&semsite:', '');
          objFilter = this.listSites.filter( reg => reg.name.toLowerCase().includes(valueAux))[0];
          objFilter.com = false;
        }
        this.optionFilter.push(objFilter);
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.resertList();
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

  verifList(texto: string) {
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
}
