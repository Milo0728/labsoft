import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserI } from './user.model';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
        private angularFirestore: AngularFirestore
    ) { }

    // Metodos para el CRUD

    getUsers() {
        return this.angularFirestore
            .collection("users")
            .snapshotChanges()
    }

    getUserById(id) {
        return this.angularFirestore
            .collection("users")
            .doc(id)
            .valueChanges()
    }

    createUser(user: UserI) {
        return new Promise<any>((resolve, reject) => {
            this.angularFirestore
                .collection("users")
                .add(user)
                .then((response) => {
                    console.log(response)
                },
                    (error) => {
                        reject(error)
                    })
        })
    }

    updateUser(user: UserI, id) {
        return this.angularFirestore
            .collection("users")
            .doc(id)
            .update({
                correo: user.correo,
                nombre: user.nombre,
                apellido: user.apellido,
                edad: user.edad,
                telefono: user.telefono,
                direccion: user.direccion,
            })
    }

    deleteUser(user) {
        return this.angularFirestore
            .collection("users")
            .doc(user.id)
            .delete();
    }


}