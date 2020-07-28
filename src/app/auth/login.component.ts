import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  // loginForm!: FormGroup;
  isLoading = false;
  email: string = "";
  password: string = "";
  // loginForm: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authenticationService: AuthenticationService
  ) {}


  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   email: new FormControl('', [
    //     Validators.required
    //   ]),
    //   password: new FormControl('', [
    //     Validators.required,
    //     // Validators.minLength(2)
    //   ]),
    // });

  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      // Validators.required
    ]),
    password: new FormControl('', [
      // Validators.required
    ])
 });

 joinForm: FormGroup = new FormGroup({
  email: new FormControl('', [
    // Validators.required
  ]),
  password: new FormControl('', [
    // Validators.required
  ]),
  passwordCheck: new FormControl('', [
    // Validators.required
  ]),
  name: new FormControl('', [
    // Validators.required
  ]),
  userName: new FormControl('', [
    // Validators.required
  ]),
});

  ngOnDestroy() {}

  // login() {
  //   this.isLoading = true;
  //   const login$ = this.authenticationService.login(this.loginForm.value);
  //   login$
  //     .pipe(
  //       finalize(() => {
  //         this.loginForm.markAsPristine();
  //         this.isLoading = false;
  //       }),
  //       untilDestroyed(this)
  //     )
  //     .subscribe(
  //       (credentials) => {
  //         log.debug(`${credentials.username} successfully logged in`);
  //         this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
  //       },
  //       (error) => {
  //         log.debug(`Login error: ${error}`);
  //         this.error = error;
  //       }
  //     );
  // }

  login(){
    this.isLoading = true;
    if(this.loginForm.valid){
      // this.isLoading = false;
      this.authenticationService.SignIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    }
  }
}
