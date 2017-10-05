import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "../../shared/services/users.service";
import { User } from "../../shared/models/user.model";
import { Message } from "../../shared/models/message.model";

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
   const formData = this.form.value;

   this.usersService.getUserByEmail(formData.email)
     .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            alert(`Hello, ${user.name}`);
          } else {
            this.showMessage('Пароль неверен!');
          }
        } else {
          this.showMessage('Такого пользователя не существует!');
        }
     });
  }

}
