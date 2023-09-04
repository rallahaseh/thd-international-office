import { Component } from '@angular/core';

@Component({
  selector: 'app-register-interface',
  templateUrl: './register-interface.component.html',
  styleUrls: ['./register-interface.component.scss']
})
export class RegisterInterfaceComponent {

  // Number of grids to be shown on the cards body section by each row
  gridColumns = 2;
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
        title: "register.cards.admin.title",
        description: "register.cards.admin.description",
        imageURL: "/assets/background/cards/campus.jpeg",
        routerLink: "/register/admin",
        routerLinkDescription: "register.cards.admin.router_link_description"
      },
      {
        title: "register.cards.user.title",
        description: "register.cards.user.description",
        imageURL: "/assets/background/cards/students_02.jpeg",
        routerLink: "/register/user",
        routerLinkDescription: "register.cards.user.router_link_description"
      }
    ];
  }
}
