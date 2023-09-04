import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from 'src/app/api-service';
import { ENDPOINTS } from 'src/app/api-service-endpoints';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Category } from '../labs.component';

/**
 * LabsDialog class which holds the code for labs dialog components
 */
@Component({
  selector: 'app-labs-dialog',
  templateUrl: './labs-dialog.component.html',
  styleUrls: ['./labs-dialog.component.scss']
})
export class LabsDialogComponent {

  title: string = ''
  content: string = ''
  // boolean flag to convert the page mode (Read / Write)
  readOnly: Boolean = true
  // Categories list
  categories: Category[] = [
    {
      label: "Angewandte Gesundheitswissenschaften",
      value: "gesundheitswissenschaften"
    },
    {
      label: "Angewandte Informatik",
      value: "informatik"
    },
    {
      label: "Elektrotechnik und Medientechnik",
      value: "elektrotechnik_medientechnik"
    },
  ];

  // Labs form group for validation
  labForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    location: new FormControl('', )
  })
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private dialogRef: MatDialogRef<LabsDialogComponent>,
    private apiService: APIService,
    public authService: AuthenticationService) {
      if (data) {
        this.title = data.title;
        this.content = data.content;
        this.readOnly = data.readOnly;
      }
  }

  /**
   * closeDialog Function which dismiss the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * create Function which call create API <createLab> to create a new lab
   */
  create(): void {
    this.apiService.post<string>(ENDPOINTS.createLab, this.labForm.value)
      .subscribe(response => {
        // TODO: - localize response message
        window.alert('Lab has been added')
        window.location.reload();
      });
  }
}
