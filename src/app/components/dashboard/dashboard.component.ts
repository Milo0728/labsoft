import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

// Modelo
import { UsuariosI } from 'src/app/shared/services/usuarios/usuarios.model';

// Servicio
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Usuarios: UsuariosI[]

  constructor(
    public usuariosService: UsuariosService,
    public authService: AuthService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe((res) => {
      this.Usuarios = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as UsuariosI)
        };
      });
    });
  }

  deleteRow(usuarios) {
    this.usuariosService.deleteUsuario(usuarios)
    this.toastr.success('El usuario ha sido eliminado correctamente', 'Usuario eliminado')
  }



}
