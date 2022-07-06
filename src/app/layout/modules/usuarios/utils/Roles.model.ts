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


export const ROL_SUPERUSER = 'SUPERUSUARIO';
export const ROL_ADMINISTRADOR = 'ADMINISTRADOR';
export const ROL_EMPLEADO = 'EMPLEADO';
export const ROL_NONE = 'SIN ROL';

export const ROLE_TYPES = [ROL_SUPERUSER,ROL_ADMINISTRADOR,ROL_EMPLEADO,ROL_NONE];


//Constantes para authService y localstorage
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const USU_ID = 'USU_ID';
export const USU_USERNAME = 'USU_USERNAME';
export const USU_ROLE = 'USU_ROLE';
export const TYPE_ROLE = 'TYPE_ROLE';

