import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name:  ['name3', [Validators.required,]],
    email: ['test3@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  

  constructor(private fb: FormBuilder,
              private router: Router ) { }

  registro(){
    console.log(this.miFormulario.valid);
    console.log(this.miFormulario.value);

    this.router.navigateByUrl('/dashboard')

  }

}
