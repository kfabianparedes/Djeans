import { Component, Input, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ProductoService } from '../../../productos/services/producto.service';

@Component({
  selector: 'tabla-compra',
  templateUrl: './tabla-compra.component.html',
  styleUrls: ['./tabla-compra.component.css'],
  providers: [MessageService]
})
export class TablaCompraComponent implements OnInit {
  @Input() detallesDeCompra: [] = [];

  products1!: [];

  products2!: [];

  statuses: SelectItem[] = [];

  clonedProducts: { [s: string]: any; } = {};

  constructor(private productService: ProductoService, private messageService: MessageService) { }

  ngOnInit() {
      // this.productService.getProductsSmall().then(data => this.products1 = data);
      // this.productService.getProductsSmall().then(data => this.products2 = data);

      this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
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
}
