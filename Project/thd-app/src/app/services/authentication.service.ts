import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router) { }

  // Return a boolean flag, checking if the user has been logged in before or not
  isLoggedIn() {
    let token = localStorage.getItem('token');
    return token != null
  }

  // Logout function which remove user logged in token
  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    this.router.navigate(['/']);
  }

  /**
   * isAdmin Function which checks if the logged in user role is Admin
   * @returns boolean flag result if the role is admin 
   */
  isAdmin() {
    let role = localStorage.getItem('role');
    return role == "admin"
  }

  /**
   * isStudent Function which checks if the logged in user role is Student
   * @returns boolean flag result if the role is student 
   */
  isStudent() {
    let role = localStorage.getItem('role');
    return role != "instructor"
  }

  /**
   * isAdmin Function which checks if the logged in user role is Instructor
   * @returns boolean flag result if the role is instructor 
   */
  isInstructor() {
    let role = localStorage.getItem('role');
    return role != "student"
  }
}
