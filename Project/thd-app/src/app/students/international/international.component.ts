import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-international',
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.scss']
})
export class InternationalComponent implements OnInit {

  reasons: {
    title: string;
    description: string;
    icon: string;
    color: string;
  }[] = [];

  videoURL: string = "https://www.youtube.com/embed/Csr_JvzqxkU"
  safeURL: SafeResourceUrl

  constructor(private sanitizer: DomSanitizer) {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
    this.initData();
  }

  ngOnInit() { }

  initData(): void {
    this.reasons = [{
      title: "students.international.reasons.first_reason_title",
      description: "students.international.reasons.first_reason_content",
      icon: "school",
      color: "#1A4273"
    },
    {
      title: "students.international.reasons.second_reason_title",
      description: "students.international.reasons.second_reason_content",
      icon: "location_pin",
      color: "#009FE3"
    },
    {
      title: "students.international.reasons.third_reason_title",
      description: "students.international.reasons.third_reason_content",
      icon: "event",
      color: "#434343"
    },
    {
      title: "students.international.reasons.fourth_reason_title",
      description: "students.international.reasons.fourth_reason_content",
      icon: "euro",
      color: "#1A4273"
    },
    {
      title: "students.international.reasons.fifth_reason_title",
      description: "students.international.reasons.fifth_reason_content",
      icon: "explore",
      color: "#009FE3"
    },
    {
      title: "students.international.reasons.sixth_reason_title",
      description: "students.international.reasons.sixth_reason_content",
      icon: "contact_support",
      color: "#434343"
    },
    {
      title: "students.international.reasons.seventh_reason_title",
      description: "students.international.reasons.seventh_reason_content",
      icon: "emoji_events",
      color: "#1A4273"
    },
    {
      title: "students.international.reasons.eighth_reason_title",
      description: "students.international.reasons.eighth_reason_content",
      icon: "sports_football",
      color: "#009FE3"
    },
    {
      title: "students.international.reasons.ninth_reason_title",
      description: "students.international.reasons.ninth_reason_content",
      icon: "work",
      color: "#434343"
    }]
  }
}
