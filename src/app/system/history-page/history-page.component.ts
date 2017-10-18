import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { CategoriesService } from './../shared/services/categories.service';
import { EventsService } from './../shared/services/events.service';
import { WFMEvent } from './../shared/models/event.model';
import { Category } from './../shared/models/category.model';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events: WFMEvent[] = [];
  isLoaded = false;
  chartData = [];
  s1: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.s1 = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], WFMEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
