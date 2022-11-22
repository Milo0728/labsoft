import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/shared/services/firebase-code-error.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  loading: boolean = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public toastr: ToastrService,
    public FireBaseError: FirebaseCodeErrorService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]],
        
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{3,}$/),


      ]],
      repetirPassword: ['', [
        Validators.required,

      ]],
    })
  }



  ngOnInit(): void {
  }

  signup() {

    console.log(this.registerForm)

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const repetirPassword = this.registerForm.value.repetirPassword;

    if (password != repetirPassword) {
      this.toastr.error('¡Las contraseñas deben ser las mismas!', 'Error');
      return;
    }
    this.loading = true;

    this.authService.registrar(email, password).then((result) => {
      this.loading = false;
      this.authService.SendVerificationMail()
      this.authService.SetUserData(result.user)

    }
    )
    .catch((error) => {
      this.loading = false;
      this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      console.log(error)
    })
  }

  restringirEspacios(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { restringirEspacios: true }
    }
    return null;
  }

  passwordStrong(control: FormControl) {
    let validacionCompleta = '^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$'

    const valid = validacionCompleta;

    if (!valid) {
      return { passwordStrong: true }
    }

    return null;
  }

  customPatternValid(config: any): ValidatorFn {
    return (control: FormControl) => {
      let urlRegEx: RegExp = config.pattern;
      if (control.value && !control.value.match(urlRegEx)) {
        return {
          invalidMsg: config.msg
        };
      } else {
        return null;
      }
    };
  }

}
