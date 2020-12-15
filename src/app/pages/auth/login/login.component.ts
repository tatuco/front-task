import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly toast: ToastrService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
    });
  }

  onSubmit() {
    this.authService.login(this.form.value)
      .subscribe(data => {
          this.toast.success('Autorización exitosa.');
          this.router.navigateByUrl('home');
        },
        error => {
          this.toast.error(`Error: ${error.error.message}`);
        },
        () => {
          this.form.reset();
        });

  }

  fieldErrors(field: string) {
    const x = this.form.get(field);
    return (x.invalid && (x.dirty || x.touched));
  }
}
