import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from "@angular/router"
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {

  title: string = ''
  content: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private router: Router,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<ErrorDialogComponent>) {
      if(data) {
        if (data.statusCode == 401) {
          // TODO: - Add localization for the messages
          this.title = "Session Expired";
          this.content = "Your session has been expired, please login again to update it";
        } else {
          this.title = data.status;
          this.content = data.reason;
        }
      }
  }
  
  /**
   * closeDialog Function which dismiss the dialog
   */
  closeDialog(): void {
    if (this.data.statusCode == 401) {
      this.dialogRef.close();
      this.authService.logout();
      this.router.navigate(['/login'])
    } else {
      this.dialogRef.close();
    }
  }
}
