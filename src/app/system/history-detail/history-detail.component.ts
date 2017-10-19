import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { EventsService } from './../shared/services/events.service';
import { CategoriesService } from './../shared/services/categories.service';
import { WFMEvent } from './../shared/models/event.model';
import { Category } from './../shared/models/category.model';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: WFMEvent;
  category: Category;
  isLoaded = false;
  s1: Subscription 

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.s1 = this.route.params
    .mergeMap((params: Params) => 
      this.eventsService.getEventById(params['id']))
      .mergeMap((event: WFMEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category)
      })
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
    
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
