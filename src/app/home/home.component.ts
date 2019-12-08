import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // news = new Array(14);
  news: any
  newsSubscription;

  length;
  pageSize = 8;
  page;

  constructor(private newsService: NewsService,
      private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.newsSubscription = this.newsService.getData(`top-headlines?country=us&pageSize=${this.pageSize}&page=${this.page}`).subscribe(data => {
        this.news = data;
        this.length = data['totalResults'];
      }
    );
  }
  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

  onFavorite(article) {
    console.log(article);

    let items = [];
    const val = localStorage.getItem('items');

    if (val != null) {
      items = JSON.parse(val);  // if we have items in local storage we need to parse them
    }

    items.push(article);  // push the article into the items array
    localStorage.setItem('items', JSON.stringify(items)); // add items into the local storage, as JSON 

    this.snackBar.open('Favorite added', 'ok', {
      duration: 3000
    });
  }

  onURL(article) {
    console.log(article.url);
    this.router.navigateByUrl(article.url);
  }

  onPageChange(event) {
    console.log(event);
    this.newsSubscription = this.newsService.getData(`top-headlines?country=us&pageSize=${this.pageSize}&page=${event.pageIndex + 1}`).subscribe(data => {
        this.news = data;
        this.length = data['totalResults'];
      });
  }
}
