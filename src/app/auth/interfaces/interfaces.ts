export interface AuthResponse {
    ok: boolean;
    uid?: string;
    nombre?: string;
    token?: string;
    msg?: string;
    correo?: string;
    rol?: string;
}
export interface Usuario {
    uid: string;
    nombre: string;
    correo: string;
    rol?: string;
    msg?: string;
}

// export interface AuthResponseLogin {
//     ok: boolean;
//     _id?: string;
//     nombre?: string;
//     token?: string;
//     message?: string;
//     correo?: string;
// }

// export interface UsuarioLogin {
//     _id: string;
//     nombre: string;
//     correo: string;
//     rol?: string;
// }