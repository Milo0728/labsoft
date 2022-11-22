import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/shared/services/firebase-code-error.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public router: Router,
    public toastr: ToastrService,
    public FireBaseError: FirebaseCodeErrorService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]],
      password: ['',
        Validators.required
      ]
    })
  }
  ngOnInit(): void {

  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loading = true;

    this.authService.ingresar(email, password).then((result) => {
      this.authService.SetUserData(result.user);
      this.authService.afAuth.authState.subscribe((user) => {
        this.loading = false;
        if (user) {
          this.router.navigate(['dashboard']);
          this.toastr.success('El usuario ha sido logueado exitosamente', 'Usuario registrado');
        }
      })
    }).catch((error) => {
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      console.log(error)
      this.loading = false;
    })

  }



}