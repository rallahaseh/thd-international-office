import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from '../api-service';
import { ENDPOINTS } from '../api-service-endpoints';
import { Article } from '../models/news.model';
import { AuthenticationService } from '../services/authentication.service';
import { ArticleModificationType } from './news.modification-types';
import { NewsDialogComponent } from './news-dialog/news-dialog.component';

/**
 * News interface
 */
export interface News {
  title: string;
  subTitle: string;
  content: string;
}

/**
 * News class which holds the code for news components
 */
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  // Variable used for search
  searchText: string = ''
  // Response array
  articles: Article[] = []
  // Filter array
  filteredArticles: Article[] = []

  constructor(public dialog: MatDialog, public authService: AuthenticationService, private apiService: APIService) { }

  ngOnInit(): void {
    this.loadNewsData();
  }

  /**
   * loadNewsData Function calls <getNews> API to fetch data
   */
  loadNewsData(): void {
    this.apiService.get<Article[]>(ENDPOINTS.getNews)
      .subscribe(response => {
        this.articles = response
        this.filteredArticles = this.articles;
      });
  }

  /**
   * searchArticle Function which is used to filter the content based on search text
   */
  searchArticle() {
    // Reinitialize array
    if (!this.filteredArticles.length) {
      this.filteredArticles = this.articles;
    }
    // Filter array
    this.filteredArticles = this.articles.filter((result) => {
      return result.title
        .toLocaleLowerCase()
        .match(this.searchText.toLocaleLowerCase())
    })
  }

  /**
   * readArticle Functions used to pass data to article dialog component
   * @param article 
   */
  readArticle(article: Article) {
    this.dialog.open(NewsDialogComponent, { data: { title: article.title, content: article.content, type: ArticleModificationType.read } });
  }

  /**
   * createArticle Functions used to pass data to create article dialog component
   * @param article 
   */
  createArticle() {
    this.dialog.open(NewsDialogComponent, { data: { type: ArticleModificationType.create } });
  }

  /**
   * editArticle Functions used to pass data to edit article dialog component
   * @param article 
   */
  editArticle(article: Article) {
    this.dialog.open(NewsDialogComponent, { data: { id: article.id, title: article.title, subTitle: article.sub_title, content: article.content, type: ArticleModificationType.update } });
  }

  /**
   * deleteArticle Functions which used to call <removeArticle/[article-id]> API to remove a article
   * @param article 
   */
  deleteArticle(article: Article) {
    let url = ENDPOINTS.removeArticle + article.id
    this.apiService.delete(url)
      .subscribe(response => {
        // TODO: - localize response message
        window.alert('Article has been removed')
        window.location.reload();
      });
  }
}
