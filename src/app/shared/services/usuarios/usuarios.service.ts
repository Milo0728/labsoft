import { Injectable } from '@angular/core';

// Fireestroe
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Modelo
import { UsuariosI } from './usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarioData: any; // Guardar los datos del usuario

  constructor(
    private angularFirestore: AngularFirestore
  ) { 
  }

  getUsuarios() {
    return this.angularFirestore
      .collection("usuarios")
      .snapshotChanges()
  }

  getUsuarioById(id) {
    return this.angularFirestore
      .collection("usuarios")
      .doc(id)
      .valueChanges()
  }

  createUsuario( usuario: UsuariosI) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("usuarios")
        .add(usuario)
        .then((response) => {
          console.log(response)
        },
        (error) => {
          reject(error)
        })
    })
  }

  updateUsuario( usuario: UsuariosI, id) {
    return this.angularFirestore
      .collection("usuarios")
      .doc(id)
      .update({
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        edad: usuario.edad,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        imagen: usuario.imagen,
        creador: usuario.creador,
      })
  }

  deleteUsuario(usuarios) {
    return this.angularFirestore
      .collection("usuarios")
      .doc(usuarios.id)
      .delete();
  }
}
