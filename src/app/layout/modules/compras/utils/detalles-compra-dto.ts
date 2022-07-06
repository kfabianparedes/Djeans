import { DetalleDeCompra } from "src/app/shared/models/detalle-de-compra.models";

export interface DetallesDeCompraDTO {
    detallesDeCompra: DetalleDeCompra[],
    comp_importe_total: number,
}

