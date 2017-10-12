import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { NgForm } from "@angular/forms";
import * as moment from 'moment';

import { WFMEvent } from "../../shared/models/event.model";
import { Category } from "../../shared/models/category.model";


@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;

    if (amount < 0) {
      amount *= -1;
    }

    const event = new WFMEvent(
      type,
      amount,
      +category,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      description
    );
  }

}
