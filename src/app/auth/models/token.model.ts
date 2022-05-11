export interface Token{
  access: string,
  refresh: string,
  username: string,
  id:number,
  rol: number,
  is_superuser: boolean,
  tipoRol: string
}