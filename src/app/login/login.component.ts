import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public authService: AuthService,private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    debugger;
    if(this.loginForm.valid) {
      const uName =this.loginForm.controls.username.value.trim();
      const pwd = this.loginForm.controls.password.value.trim();
      this.authService.SignIn(uName,pwd);
      //this.authService.SignIn('sreehari@pd.com', 'sreehari');
    }
  }

}
