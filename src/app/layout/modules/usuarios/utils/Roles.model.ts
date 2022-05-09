export enum Roles{
    superuser = 'SUPERUSUARIO',
    admin = 'ADMINISTRADOR',
    employee = 'EMPLEADO',
    noRol = 'SIN ROL',
}
export interface Rol {
    rol_id   : number,
    rol_tipo : string
}