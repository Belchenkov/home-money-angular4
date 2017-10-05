import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

import { UsersService } from "../../shared/services/users.service";
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.userService.createNewUser(user)
      .subscribe(() => {
        this.router.navigate(['login'], {
          queryParams: {
            nowCanLoggin: true
          }
        });
      });
  }

}
