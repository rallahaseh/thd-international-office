import { Component } from '@angular/core';

/**
 * Home class which holds the code for home page components
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // Number of grids to be shown on the cards body section by each row
  gridColumns = 3;
  // Cards object, which holds entities for mat-card to be shown
  cardData: {
    title: string;
    description: string;
    imageURL: string;
    routerLink: string;
    routerLinkDescription: string;
  }[] = [];

  constructor() {
    this.initData();
  }

  initData(): void {
    this.cardData = [
      {
        title: "home.cards.news.title",
        description: "home.cards.news.description",
        imageURL: "/assets/background/cards/news.jpeg",
        routerLink: "/news",
        routerLinkDescription: "home.cards.news.router_link_description"
      },
      {
        title: "home.cards.students.title",
        description: "home.cards.students.description",
        imageURL: "/assets/background/cards/students.jpeg",
        routerLink: "/students/apply",
        routerLinkDescription: "home.cards.students.router_link_description"
      },
      {
        title: "home.cards.labs.title",
        description: "home.cards.labs.description",
        imageURL: "/assets/background/cards/labs.jpeg",
        routerLink: "/labs",
        routerLinkDescription: "home.cards.news.router_link_description"
      }
    ];
  }
}
