import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    terms: ['', [Validators.required, Validators.minLength(6)]]
  });
  loading = false;
  submitted = false;
  //returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    
  }

  ngOnInit() {
    
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}
  get f() { return this.loginForm.controls; }

    onSubmit() {
      console.log(this.loginForm.value);
    }

}
