import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from 'src/app/api-service';
import { ENDPOINTS } from 'src/app/api-service-endpoints';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ArticleModificationType } from '../news.modification-types';

/**
 * NewsDialog class which holds the code for news dialog components
 */
@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent {

  id: string = ''
  title: string = ''
  subTitle: string = ''
  content: string = ''
  // Operation type to convert the page mode (Read / Write / Update)
  allTypes = ArticleModificationType;
  type = ArticleModificationType.read

  // Article form group for validation
  articleForm: FormGroup = new FormGroup({
    title_en: new FormControl(this.title, [Validators.required]),
    title_de: new FormControl(this.title, [Validators.required]),
    sub_title_en: new FormControl(''),
    sub_title_de: new FormControl(''),
    content_en: new FormControl('', [Validators.required]),
    content_de: new FormControl('', [Validators.required])
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<NewsDialogComponent>,
    private apiService: APIService,
    public authService: AuthenticationService) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.subTitle = data.subTitle;
      this.content = data.content;
      this.type = data.type;
      if (data.type == ArticleModificationType.update) {
        if (apiService.isEnglish()) {
          this.articleForm.get('title_en')?.setValue(data.title);
          this.articleForm.get('sub_title_en')?.setValue(data.subTitle);
          this.articleForm.get('content_en')?.setValue(data.content);
        } else {
          this.articleForm.get('title_de')?.setValue(data.title);
          this.articleForm.get('sub_title_de')?.setValue(data.subTitle);
          this.articleForm.get('content_de')?.setValue(data.content);
        }
      }
    }
  }

  /**
   * closeDialog Function which dismiss the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * create Function which call create API <createArticle> to create a new article
   */
  create(): void {
    this.articleForm.value
    let requestBody = {
      title: {
        "english": this.articleForm.get('title_en')?.value,
        "deutsch": this.articleForm.get('title_de')?.value,
      },
      sub_title: {
        "english": this.articleForm.get('sub_title_en')?.value,
        "deutsch": this.articleForm.get('sub_title_de')?.value,
      },
      content: {
        "english": this.articleForm.get('content_en')?.value,
        "deutsch": this.articleForm.get('content_de')?.value,
      }
    };
    this.apiService.post<string>(ENDPOINTS.createArticle, requestBody)
      .subscribe(response => {
        // TODO: - localize response message
        window.alert('Article has been added')
        window.location.reload();
      });
  }

  /**
   * update Function which call edit API <editArticle> to create a new article
   */
  update(): void {
    this.articleForm.value
    let requestBody = {
      title: {
        "english": this.articleForm.get('title_en')?.value,
        "deutsch": this.articleForm.get('title_de')?.value,
      },
      sub_title: {
        "english": this.articleForm.get('sub_title_en')?.value,
        "deutsch": this.articleForm.get('sub_title_de')?.value,
      },
      content: {
        "english": this.articleForm.get('content_en')?.value,
        "deutsch": this.articleForm.get('content_de')?.value,
      }
    };
    let url = ENDPOINTS.editArticle + this.id
    this.apiService.put<string>(url, requestBody)
      .subscribe(response => {
        // TODO: - localize response message
        window.alert('Article has been updated')
        window.location.reload();
      });
  }
}
