import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { MessageService } from 'primeng/api';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { DetallesDeCompraDTO } from '../../utils/detalles-compra-dto';

@Component({
    selector: 'tabla-compra',
    templateUrl: './tabla-compra.component.html',
    styleUrls: ['./tabla-compra.component.css'],
    providers: [MessageService]
})
export class TablaCompraComponent implements OnChanges{
    @Input() detallesDeCompra: DetalleDeCompra[] = [];
    @Input() nuevoDetalle: DetalleDeCompra = {} as DetalleDeCompra;
    @Output() isDataSave = new EventEmitter<boolean>();
    //Data de la compra
    public montoTotal : number = 0;
    @Output() montoTotalDeCompra = new EventEmitter<number>();
    @Output() dataDetallesDeCompra = new EventEmitter<DetallesDeCompraDTO>();

    constructor() { }

    public agregarCantidad(cantidad: number, indice: number): void {
        if(cantidad <= 0){
            this.detallesDeCompra[indice].det_comp_cantidad = 0;
        }

        this.detallesDeCompra[indice].det_comp_importe = +(this.detallesDeCompra[indice].det_comp_cantidad * this.detallesDeCompra[indice].productoDetalle?.prod_precio_compra!);
        
        this.montoTotal = 0;
        this.detallesDeCompra.forEach((detalle: DetalleDeCompra) => {
            this.montoTotal += detalle.det_comp_importe;
            
        });

        this._validarCantidadDeProductosPorDetalle();
        
    }

    private _validarCantidadDeProductosPorDetalle(): void{
        let sonDetallesValidos = true;
        this.detallesDeCompra.forEach((detail: DetalleDeCompra) => {
            if(this.montoTotal<=0 || this.detallesDeCompra.length<=0 || detail.det_comp_cantidad===0){
                sonDetallesValidos = false;
                return;
            }
        });
        //Validamos que haya detalles antes de hacer la compra
        console.log(sonDetallesValidos);
        if(sonDetallesValidos){
            this.isDataSave.emit(true);
            const dataDetalles : DetallesDeCompraDTO = {
                comp_importe_total : this.montoTotal,
                detallesDeCompra : this.detallesDeCompra
            }
            console.log(dataDetalles);
            this.dataDetallesDeCompra.emit(dataDetalles);
        }else{
            this.isDataSave.emit(false)
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        const nuevoDetalle: DetalleDeCompra = changes['nuevoDetalle'].currentValue;
        if(nuevoDetalle != undefined){
            const isEmpty = Object.keys(nuevoDetalle).length === 0;
            if(!isEmpty) this._agregarDetalle(nuevoDetalle);
        }
    }

    private _agregarDetalle(detalleNuevo: DetalleDeCompra): void {
        const detalleEncontrado = this.detallesDeCompra.find((detalleDeCompra:DetalleDeCompra)=>detalleDeCompra.productoDetalle?.prod_id == detalleNuevo.productoDetalle?.prod_id);
        if(detalleEncontrado==undefined) {
            detalleNuevo.det_comp_importe = detalleNuevo.det_comp_cantidad * ( detalleNuevo.productoDetalle?.prod_precio_compra || 0);
            this.detallesDeCompra.push({...detalleNuevo});
        }
        this._validarCantidadDeProductosPorDetalle();

    }

    public eliminarDetalle(detalle: DetalleDeCompra): void {
        this.detallesDeCompra = [...this.detallesDeCompra.filter((detail: DetalleDeCompra) => detail !== detalle)]
        this._validarCantidadDeProductosPorDetalle();
    }
}
