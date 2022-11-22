import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

// Servicios
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public usuarioEditForm: FormGroup
  userRef: any

  constructor(
    public authService: AuthService,
    public usuariosService: UsuariosService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService

  ) {
    this.usuarioEditForm = this.formBuilder.group({
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

      creador: ['', [
      ]]
    })
  }

  ngOnInit(): void {

    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.usuariosService.getUsuarioById(id).subscribe(res => {
      this.userRef = res
      this.usuarioEditForm = this.formBuilder.group({
        nombre: [this.userRef.nombre,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u),
        ]],
        apellido: [this.userRef.apellido,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)
        ]],
        correo: [this.userRef.correo,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ]],
        direccion: [this.userRef.direccion,
        [
          Validators.required,
          Validators.pattern(/[A-Za-z0-9'\.\-\s\,]/)
        ]],
        telefono: [this.userRef.telefono,
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]],
        edad: [this.userRef.edad,
        [
          Validators.required,
          Validators.pattern(/^([1-9]?\d|100)$/)
        ]],
        imagen: [this.userRef.imagen,
        [

        ]],
        creador: [this.userRef.creador,
        [

        ]],
      })
    })
  }

  onSubmit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.usuariosService.updateUsuario(this.usuarioEditForm.value, id)
    this.toastr.success('El usuario ha sido modificado correctamente', 'Usuario editado');
    this.router.navigate(['/dashboard'])
  }

}
