export interface UsuarioList {
    uid?: string;
    _id?: string;
    ok?: boolean;
    nombre?: string;
    usuario?: Usuario;
}
export interface Usuario {
    ok?: boolean;
    uid?: string;
    _id?: string;
    nombre?: string;
    token?: string;
    msg?: string;
    correo?: string;
    rol?: string;
}