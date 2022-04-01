export interface Usuario{
    id: number,
    username: string,
    is_active: boolean,
    is_employee: boolean,
    is_staff: boolean,
    is_superuser: boolean,

    //Para filtrar en tabla
    tipoDeUsuario?: string,
    estaActivo?: string
}