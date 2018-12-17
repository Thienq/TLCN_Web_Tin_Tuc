import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Guest } from '../_entity/guest';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  guest : Guest  
  error : String
  
  constructor(private loginService : LoginService, private route : Router) { 
    this.guest = new Guest();
  }

  ngOnInit() {
    if(localStorage.email){
      this.route.navigate(["/"]);
    }

  }

  login()  {
    this.loginService.login(this.guest)
      .pipe(first())
      .subscribe(res => {
        if(res.success == "true")
        {
          localStorage.setItem("email", res.data.email)
          localStorage.setItem("lastName", res.data.lastName)
          this.route.navigate(["/"]);
        }
        else
        {
            this.error = res.message
        }
      }, err => {
        console.log(err)
      })      
  }
  logout(){
    localStorage.clear()
  }
}
