import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtroName'
})
export class FiltroName implements PipeTransform {

    transform(lista: any[], digitado: string): any[] {
        digitado = digitado.toLowerCase();
        digitado = digitado.replace('flex4:', '');
        digitado = digitado.replace('&comelemento:', '');
        digitado = digitado.replace('&semelemento:', '');
        digitado = digitado.replace('&comgrupo:', '');
        digitado = digitado.replace('&semgrupo:', '');
        digitado = digitado.replace('&comsite:', '');
        digitado = digitado.replace('&semsite:', '');
        digitado = digitado.replace('mir:', '');
        digitado = digitado.trim();
        return lista.filter( reg => reg.name.toLowerCase().includes(digitado));
    }
}
