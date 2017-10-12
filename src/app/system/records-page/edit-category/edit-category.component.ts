import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

import { Category } from "../../shared/models/category.model";
import { CategoryService } from "../../shared/services/category.service";
import { Message } from "../../../shared/models/message.model";

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoryService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;

    if (capacity < 0) {
      capacity *= -1;
    }

    let category = new  Category(name, capacity, +this.currentCategoryId);

    this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категория успешно отредактирована';
        window.setTimeout(() => this.message.text = '', 5000);
      })
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
