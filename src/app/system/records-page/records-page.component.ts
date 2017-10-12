import { Component, OnInit } from '@angular/core';
import { Category } from "../shared/models/category.model";
import { CategoryService } from "../shared/services/category.service";
import {findIndex} from "rxjs/operator/findIndex";

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoryService) { }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const idx = this.categories.
      findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

}
