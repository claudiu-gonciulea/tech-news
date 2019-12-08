import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  selected;
  articleSources: any;

  sourceSubscription;

  selectedItem;

  news;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getSourcesData() ;
    //console.log(this.articleSources.sources[0].id);
    //this.selected = this.articleSources.sources[0].id;
    this.selected = this.selectedItem;

    this.getData(this.selected);
  }

  getSourcesData() {
    this.sourceSubscription = this.newsService.getData('sources').subscribe(data => {

        this.articleSources = data;
        this.selectedItem = this.articleSources.sources[0].id;
      }
    );
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  getData(selectedItem) {
    this.newsService.getData(`top-headlines?sources=${selectedItem}`).subscribe (
      data => {
        this.news = data;
      }
    )
  }

  onSourceChange() {
    this.getData(this.selected);
  }
}
