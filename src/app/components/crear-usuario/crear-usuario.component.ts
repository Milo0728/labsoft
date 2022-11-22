import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  

  public crearUsuariosForm: FormGroup;

  constructor(
    public usuariosService: UsuariosService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public router: Router,
    private toastr: ToastrService,
  ) {
    this.crearUsuariosForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u),
      ]],
      apellido: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)
      ]],
      correo: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]],
      direccion: ['', [
        Validators.required,
        Validators.pattern(/[A-Za-z0-9'\.\-\s\,]/)
        
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
      edad: ['', [
        Validators.required,

        Validators.pattern(/^([1-9]?\d|100)$/)
      ]],
      imagen: ['', [
      ]],

      creador: [authService.userData.displayName ? authService.userData.displayName : authService.userData.email , [
      ]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.usuariosService.createUsuario(this.crearUsuariosForm.value)
    this.toastr.success('El usuario ha sido creado correctamente', 'Usuario creado');
    this.router.navigate(['/dashboard'])

  }

  restringirEspacios(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { restringirEspacios: true }
    }
    return null;
  }

}
