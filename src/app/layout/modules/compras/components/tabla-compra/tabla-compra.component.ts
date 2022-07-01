import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { MessageService, SelectItem } from 'primeng/api';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { ProductoService } from '../../../productos/services/producto.service';

@Component({
    selector: 'tabla-compra',
    templateUrl: './tabla-compra.component.html',
    styleUrls: ['./tabla-compra.component.css'],
    providers: [MessageService]
})
export class TablaCompraComponent implements OnInit , OnChanges{
    @Input() detallesDeCompra: DetalleDeCompra[] = [];
    @Input() nuevoDetalle: DetalleDeCompra = {} as DetalleDeCompra;
    @Output() detalleDeCompraActualizado = new EventEmitter<DetalleDeCompra[]>();

    products1!: [];

    products2!: [];

    statuses: SelectItem[] = [];

    clonedProducts: { [s: string]: any; } = {};

    constructor(private productService: ProductoService, private messageService: MessageService) { }

    ngOnInit() {
        // this.productService.getProductsSmall().then(data => this.products1 = data);
        // this.productService.getProductsSmall().then(data => this.products2 = data);
        // this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
    }

    onRowEditInit(product: any) {

        // this.clonedanys[product.id] = {...product};
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        const nuevoDetalle: DetalleDeCompra = changes['nuevoDetalle'].currentValue;
        const isEmpty = Object.keys(nuevoDetalle).length === 0;
        if(!isEmpty) this.agregarDetalle(nuevoDetalle);
    }

    onRowEditSave(product: any) {
        if (product.price > 0) {
            delete this.clonedProducts[product.id];
            this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
        }
        else {
            this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
        }
    }

    onRowEditCancel(product: any, index: number) {
        // this.products2[index] = this.clonedProducts[product.id];
        // delete this.clonedProducts[product.id];
    }
    guardarEditado(detalle: DetalleDeCompra): void {
        const indiceDetalle = this.detallesDeCompra.findIndex((detalleDeCompra:DetalleDeCompra)=>detalleDeCompra.productoDetalle?.prod_id == detalle.productoDetalle?.prod_id);
        if(indiceDetalle!=-1) {
            this.detallesDeCompra[indiceDetalle].det_comp_importe = this.detallesDeCompra[indiceDetalle].det_comp_cantidad * ( this.detallesDeCompra[indiceDetalle].productoDetalle?.prod_precio_compra!);
            // this.detallesDeCompra.push({...detalleNuevo});
            console.log(this.detallesDeCompra);
        }
    }
    agregarDetalle(detalleNuevo: DetalleDeCompra): void {
        const detalleEncontrado = this.detallesDeCompra.find((detalleDeCompra:DetalleDeCompra)=>detalleDeCompra.productoDetalle?.prod_id == detalleNuevo.productoDetalle?.prod_id);
        if(detalleEncontrado==undefined) {
            detalleNuevo.det_comp_importe = detalleNuevo.det_comp_cantidad * ( detalleNuevo.productoDetalle?.prod_precio_compra || 0);
            this.detallesDeCompra.push({...detalleNuevo});
            console.log(this.detallesDeCompra);
        }
    }

    eliminarDetalle(detalle: DetalleDeCompra): void {
        this.detallesDeCompra = [...this.detallesDeCompra.filter((detail: DetalleDeCompra) => detail !== detalle)]
        this.detalleDeCompraActualizado.emit([...this.detallesDeCompra]);
    }
}
