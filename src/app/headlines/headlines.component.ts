import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.scss']
})
export class HeadlinesComponent implements OnInit {

  news;

  categories = [
    'IBM',
    'Java',
    'Security',
    'IBM Cloud',
    'Hackathon'
  ]

  constructor(private newsService: NewsService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getCategoryDate(this.categories[0]);
  }

  onGetCategoryDate(category) {
    console.log(category);
    this.getCategoryDate(category);
  }

  getCategoryDate(category) {
    this.newsService.getData(`everything?q=${category.toLowerCase()}`).subscribe(data => {
      this.news = data
    })
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
}
