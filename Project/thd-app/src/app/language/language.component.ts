import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { style, animate, trigger, transition } from "@angular/animations";

interface Languages {
  name: string;
  value: string;
}
/**
 * Language class which holds the code for language components
 */
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  animations: [
    // Animation for header title <fade animation style>
    trigger("fadeAnimation", [
      transition("false=>true", [
        style({ opacity: 0 }),
        animate("500ms", style({ opacity: 1 }))
      ]),
      // The animation spend 500ms, and start afer 100ms
      transition("true=>false", [animate("600ms 2000ms", style({ opacity: 0 }))])
    ])
  ]
})
export class LanguageComponent implements AfterViewInit {

  // List of current languages used in the app
  languages: Languages[] = [
    { name: 'English', value: 'en' },
    { name: 'Deutsch', value: 'de' }
  ];
  // Currently used language
  currentLanguage: String;

  // Animation
  @ViewChild("wordCarousel", { static: false }) wordCarouselEl: ElementRef | undefined;
  wordCarousel = ["Technische Hochschule Deggendorf", "Deggendorf Institute of Technology"];
  wordCounter = -1;
  toogle: boolean = true;
  ngAfterViewInit() {
    setTimeout(() => {
      this.toogle = false;
    })
  }

  constructor(private translateService: TranslateService) {
    // Initalize translate service object
    const languges = this.languages.map(({ value }) => value);
    this.translateService.addLangs(languges);
    let defaultLanguge = languges[0];
    let selectedLanguage = localStorage.getItem("selectedLanguge");
    if (selectedLanguage) {
      this.translateService.setDefaultLang(selectedLanguage);
      this.translateService.use(selectedLanguage);
    } else {
      this.translateService.setDefaultLang(defaultLanguge);
      // Set default language same as Browser language
      const language = this.translateService.getBrowserLang() ?? defaultLanguge;
      this.translateService.use(language);
    }
    this.currentLanguage = this.translateService.currentLang;
  }

  /**
   * nextWord Function used for animation to keep switching text
   * @param event 
   */
  nextWord(event: any) {
    this.toogle = !this.toogle;
    if (event.fromState)
      this.wordCounter = (this.wordCounter + 1) % this.wordCarousel.length;
  }

  /**
   * changeTo Function used to change the current used language in the app
   * @param language 
   */
  changeTo(language: string): void {
    this.translateService.use(language);
    localStorage.setItem("selectedLanguge", language);
  }
}
