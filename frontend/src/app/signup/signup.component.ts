import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  
  form: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    terms: ['', [Validators.required, Validators.minLength(6)]]
  });
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log(this.form.value);
  }

}
