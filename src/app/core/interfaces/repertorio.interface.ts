export interface RepertorioResponse {
    ok: boolean;
    uid?: string;
    token?: string;
    msg?: string;
    nombre?: string;
    usuario?: string;
}
export interface Repertorio {
    ok?: boolean;
    total?: number;
    repertorios?: RepertorioList;
    uid?: string;
    msg?: string;
    nombre?: string;
}
export interface RepertorioList {
    uid?: string;
    nombre?: string;
    usuario?: Usuario;
}
export interface Usuario {
    ok?: boolean;
    uid?: string;
    nombre?: string;
    token?: string;
    msg?: string;
    correo?: string;
    rol?: string;
}