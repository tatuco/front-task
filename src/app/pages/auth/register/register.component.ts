import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly toast: ToastrService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(25)])],
    });
  }

  onSubmit() {
    this.authService.register(this.form.value)
      .subscribe(data => {
          this.toast.success('Registro exitoso.');
          this.router.navigateByUrl('login');
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
