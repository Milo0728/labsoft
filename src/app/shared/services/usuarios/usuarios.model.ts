import { UserI } from "src/app/user.model";

export class UsuariosI {
    id: string;
    correo: string;
    nombre: string;
    apellido: string;
    edad: number;
    telefono: string;
    direccion: string;
    imagen: string;
    creador: UserI;
}
