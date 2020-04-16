import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {HttpResponse} from "@angular/common/http";
import {NotificationService} from "../../shared/services/notification.service";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
  }
  login() {
    const LoginData = {
      username: this.loginForm.controls.username.value.toString(),
      password: this.loginForm.controls.password.value.toString()
    };
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      this.authService.Login(LoginData).subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.status === 200) {
              this.authService.saveToken(resp.body.token);
              this.authService.saveUserId(resp.body.id);
              this.router.navigateByUrl('');
            } else {
            this.notificationService.errorNotification('username or password wrong');
          }
        },
        err => {
          this.notificationService.errorNotification('username or password wrong');
        }
      );
    }
  }

}
