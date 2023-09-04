import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from 'src/app/api-service';
import { ENDPOINTS } from 'src/app/api-service-endpoints';
import { Lab } from 'src/app/models/labs.model';

/**
 * LabsReserve class which holds the code for reserving a lab dialog components
 */
@Component({
  selector: 'app-labs-reserve',
  templateUrl: './labs-reserve.component.html',
  styleUrls: ['./labs-reserve.component.scss']
})
export class LabsReserveComponent implements OnInit {

  // Labs object
  lab: Lab = {
    id: '',
    name: '',
    description: '',
    category: '',
    instructor: '',
    location: '',
    reserved: false
  }

  // Labs form group for validation
  labForm: FormGroup = new FormGroup({
    instructor: new FormControl('', [Validators.required])
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<LabsReserveComponent>,
    private apiService: APIService) {
    if (data) {
      this.lab = data;
    }
  }

  ngOnInit(): void {
  }

  /**
   * reserve Function which calls <reserveLab/[lab-id]> API to reserve a lab
   */
  reserve() {
    let url = ENDPOINTS.reserveLab + this.lab.id
    let obj = {
      "reserved": true,
      "instructor": this.labForm.get('instructor')?.value
    }
    this.apiService.put<Lab>(url, obj)
      .subscribe(response => {
        // TODO: - localize response message
        window.alert('Lab has been reserved')
        window.location.reload();
      });
  }
}
