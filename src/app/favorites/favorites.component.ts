import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  articles;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getFavorites();
  }

  // read from local storage
  getFavorites() {

    const val = localStorage.getItem('items');

    if (val != null) {
      this.articles = JSON.parse(val);
    }
  }

  onUnFavorite(article) {

    const index = this.articles.indexOf(article); // find the article you want to unfavorite

    // remove the article. use the javascript splice method
    this.articles.splice(index, 1);

    localStorage.setItem('items', JSON.stringify(this.articles))

  }

  onURL(article) {
    console.log(article.url);
    this.router.navigateByUrl(article.url);
  }
}
