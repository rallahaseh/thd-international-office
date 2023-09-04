import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../api-service';
import { ENDPOINTS } from '../api-service-endpoints';
import { Login } from '../models/login.model';

/**
 * Login class which holds the code for login components
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isPasswordFieldHidden: boolean = true;

  // Form group variables used for validation
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)])
  })

  constructor(private apiService: APIService, private router: Router) { }

  /**
   * login Function used to call <login> API to verfiy the user credentials 
   */
  login(): void {
    this.apiService.post<Login>(ENDPOINTS.login, this.loginForm.value)
      .subscribe(response => {
        localStorage.setItem('id', response.id)
        localStorage.setItem('role', response.role)
        localStorage.setItem('token', response.token)
        localStorage.setItem('fullName', response.fullName)
        this.router.navigate(['/'])
      });
  }
}
