export interface Usuario{
    id: number,
    username: string,
    rol: number,
    is_active: boolean,
    is_superuser?: boolean,
    //Para filtrar en tabla
    tipoDeUsuario?: string,
    estaActivo?: string,
    //Para saber el tipo de usuario
    password?: string,
    tipoRol?: string

}