import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-olvidar-password',
  templateUrl: './olvidar-password.component.html',
  styleUrls: ['./olvidar-password.component.css']
})
export class OlvidarPasswordComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
