import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api-service';
import { ENDPOINTS } from 'src/app/api-service-endpoints';
import { User } from 'src/app/models/user.model';

/**
 * AdminRegistrationComponent class which holds the code for register as admin components
 */
@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.scss']
})
export class AdminRegistrationComponent {

  isPasswordFieldHidden: boolean = true;
  maxDate: Date;
  // User data object
  userData = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    username: '',
    email: '',
    password: ''
  }

  // Form group variables used for validation
  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl(''),
    role: new FormControl(''),
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)])
  })

  constructor(private apiService: APIService, private router: Router) {
    // Max date for age is +18
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 0, 1);
  }

  /**
   * register Function used to call <register> API to register the user 
   */
  register(): void {
    let dobValue = this.registrationForm.get('dob')?.value
    let dob = formatDate(dobValue, 'yyyy-MM-dd', 'en-US') ?? '';
    this.userData = {
      first_name: this.registrationForm.get('firstName')?.value,
      last_name: this.registrationForm.get('lastName')?.value,
      date_of_birth: dob,
      username: this.registrationForm.get('username')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value
    }
    this.apiService.post<User>(ENDPOINTS.registerAsAdmin, this.userData)
      .subscribe(response => {
        this.router.navigate(['/login'])
      });
  }
}
