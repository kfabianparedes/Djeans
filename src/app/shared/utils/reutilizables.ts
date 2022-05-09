import Swal from "sweetalert2";

export function errorAlerta(codigo: string,mensaje: string): void {
    Swal.fire({
        title:`Error (${codigo})`, 
        text: mensaje, 
        icon:'error',
        confirmButtonColor: '#d33'});
}

export function exitoAlerta(titulo: string,mensaje: string): void {
    Swal.fire({
        title:`${titulo}...`, 
        text: mensaje, 
        icon:'success',
        confirmButtonColor: '#3085d6'
    });
}

export function validarCodigosDeErrorDelAPI(codigo:number): boolean{
    if (codigo === 400 || codigo === 401 || codigo === 403 || codigo === 404 || codigo === 500)
        return true;
    return false;
}

export const validarCaracteresAlfabeticosSinEspacios: RegExp = /^[a-zñáéíóúA-ZÑÁÉÍÓÚ]+$/;
export const validarCaracteresAlfabeticosConEspacios: RegExp = /^[a-zñáéíóúA-ZÑÁÉÍÓÚ ]+$/;
export const validarCaracteresAlfanumericosConEspaciosMasSimbolos : RegExp = /[a-zñáéíóú\-.#' A-ZÑÁÉÍÓÚ 0-9]+$/;

export const datosInicialesDescripcionEstado = {
    descripcion: '',
    estado: true,
};

//EJEMPLO DE FORKJOIN - SOLICITUDES EN ORDEN SECUENCIAL SIN DEPENDENCIA
    // forkJoin([
    //   this.categoriaService.eliminarCategoria(idCategoria),
    //   this.categoriaService.listarCategorias()
    // ]).subscribe({
    //   next: (respuestas: Respuesta[])=>{
    //     (respuestas[1].data).forEach((categoria: Categoria) => {
    //       this.categorias.push({
    //         ...categoria, 
    //         categoriaEstado: categoria.cat_estado?'ACTIVO':'INACTIVO'
    //       })
    //     });
    //   }
    // });