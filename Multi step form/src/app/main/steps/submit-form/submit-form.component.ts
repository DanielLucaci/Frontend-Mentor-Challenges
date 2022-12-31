import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { CanComponentDeactivate } from 'src/app/services/can-deactivate.guard';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements CanComponentDeactivate, OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  @ViewChild('email', { static: false }) emailInput: NgModel;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const user = this.userService.getUser();
    console.log(user);
    if (user) {
      const { name, email, phone } = user;
      setTimeout(() => {
        this.form.form.setValue({
          name,
          email,
          phone
        });
      },);
    }
  }

  setPlaceholder(event: InputEvent, placeholder: string = "") {
    (event.target as HTMLInputElement).placeholder = placeholder;
  }

  onEmailChange(event: InputEvent) {
    console.log('Email Changed');
    if (this.emailInput.valid) {
      const user = this.userService.getUserByEmail(this.emailInput.value);
      if (user) { // user was found
        const { name, email, phone } = user;
        this.form.form.setValue({
          name,
          email,
          phone
        })
        return;
      }
    }
    this.userService.deleteUser();
  }

  onSubmit(f: NgForm) {
    const { name, email, phone } = this.form.form.value;
    const user = !!this.userService.getUser();
    if (user) { // create user
      this.userService.updateUser(name, phone);
    } else { // update user
      this.userService.createUser(name, email, phone);
    }
    this.router.navigate(['..', 'select-plan'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.form.valid)
      return true;
    return confirm('Are you sure you want to exit? Your data will be lost');
  }
}
