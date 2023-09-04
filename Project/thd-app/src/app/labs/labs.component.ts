import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../api-service';
import { ENDPOINTS } from '../api-service-endpoints';
import { Lab } from '../models/labs.model';
import { AuthenticationService } from '../services/authentication.service';
import { LabsDialogComponent } from './labs-dialog/labs-dialog.component';
import { LabsReserveComponent } from './labs-reserve/labs-reserve.component';

export interface Category {
  label: string;
  value: string;
}

/**
 * Labs class which holds the code for labs components
 */
@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent implements OnInit {

  // Variable used for search
  searchText: string = ''
  // Variable used for filtration
  selectedCategory: string = ''

  // Response array
  labs: Lab[] = []
  // Filter array
  filteredLabs: Lab[] = []
  // List of categories
  categories: string[] = [
    "labs.categories.gesundheitswissenschaften",
    "labs.categories.informatik",
    "labs.categories.elektrotechnik_medientechnik"
  ];

  constructor(public dialog: MatDialog, public authService: AuthenticationService, private apiService: APIService) { }

  ngOnInit(): void {
    this.loadArticlesData();
  }

  /**
   * loadNewsData Function calls <getLabs> API to fetch data
   */
  loadArticlesData(): void {
    this.apiService.get<Lab[]>(ENDPOINTS.getLabs)
      .subscribe(response => {
        this.labs = response
        this.filteredLabs = this.labs;
      });
  }

  /**
   * searchForLab Function which is used to filter the content based on search text
   */
  searchForLab() {
    // Reinitialize array
    if (!this.filteredLabs.length && !this.selectedCategory.length) {
      this.filteredLabs = this.labs;
    }
    // Reinitialize category
    this.selectedCategory = '';
    // Filter array
    this.filteredLabs = this.labs.filter((result) => {
      return result.name
        .toLocaleLowerCase()
        .match(this.searchText.toLocaleLowerCase())
    })
  }

  /**
   * searchForLab Function which is used to filter the content based category
   */
  filterLabs(value: string) {
    if(!value) {
      this.filteredLabs = this.labs;
      return 
    }
    // Reinitialize array
    if (!this.filteredLabs.length) {
      this.filteredLabs = this.labs;
    }
    // Filter array
    let selectedValue = value.split(".")[2];

    this.filteredLabs = this.labs.filter((result) => {
      return result.category
        .match(selectedValue)
    })
  }

  /**
   * reserveDialog Functions used to pass data to rserve dialog component
   * @param lab 
   */
  reserveDialog(lab: Lab) {
    this.dialog.open(LabsReserveComponent, { data: lab });
  }

  /**
   * contentDialog Functions used to pass data to labs dialog component with ReadOnly mode
   * @param lab 
   */
  contentDialog(lab: Lab) {
    this.dialog.open(LabsDialogComponent, { data: { title: lab.name, content: lab.description, readOnly: true } });
  }

  /**
   * createLab Functions used to pass data to create lab dialog component
   */
  createLab() {
    this.dialog.open(LabsDialogComponent, { data: { readOnly: false } });
  }

  /**
   * deleteLab Functions which used to call <removeLab/[lab-id]> API to remove a lab
   * @param lab 
   */
   deleteLab(lab: Lab) {
    let url = ENDPOINTS.removeLab + lab.id
    this.apiService.delete(url)
      .subscribe(response => {
        // TODO: - localize response message
        window.alert('Lab has been removed')
        window.location.reload();
      });
  }
}
