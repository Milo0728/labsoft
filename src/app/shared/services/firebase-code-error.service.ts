import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from 'src/app/utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  codeError(code: string) {
    switch (code) {
      // El correo ya éxiste
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya éxiste'

      // Contraseña debil
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil'

      // Correo inválido
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo inválido'

      // Contraseña incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta'

      // Usuario no existente
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no éxiste'

      case FirebaseCodeErrorEnum.EmailNotVerified:
        return 'El email no ha sido verificado'

      case FirebaseCodeErrorEnum.AccountExistsWithDifferentCredential:
        return 'Ya éxiste una cuenta con el mismo correo, pero en diferente credencial'


      default:
        return 'Error desconocido';
    }
  }
}
