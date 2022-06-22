import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MessageService, SelectItem } from 'primeng/api';
import { DetalleDeCompra } from 'src/app/shared/models/detalle-de-compra.models';
import { ProductoService } from '../../../productos/services/producto.service';

@Component({
    selector: 'tabla-compra',
    templateUrl: './tabla-compra.component.html',
    styleUrls: ['./tabla-compra.component.css'],
    providers: [MessageService]
})
export class TablaCompraComponent implements OnInit {
    @Input() detallesDeCompra: DetalleDeCompra[] = [];

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

    eliminarDetalle(detalle: DetalleDeCompra): void {
        this.detallesDeCompra = [...this.detallesDeCompra.filter((detail: DetalleDeCompra) => detail !== detalle)]
        console.log('DETALLES COMPRA EN TABLA');
        console.log(this.detallesDeCompra);
        this.detalleDeCompraActualizado.emit([...this.detallesDeCompra]);
    }
}
