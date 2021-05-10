import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private title: Title,
      private router: Router,
      private toastr: ToastrService,
      private authService: AuthService,
      private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
      this.title.setTitle('Login')
      this.createForm();
  }

  signIn() {
      if (this.form.valid) {
          this.authService.login(this.form.getRawValue())
            .subscribe(() => {
                this.router.navigate(['/home']);
            }, error => {
              this.toastr.error('', error, { timeOut: 3000, closeButton: true });
            });
      }
  }

  private createForm() {
    this.form = this._formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
}
