import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/observable/timer';
import {Subscription} from "rxjs";

declare var require: any;
require('../js/jquery-3.2.0.min.js');
require('../js/bootstrap.min.js');
require('../js/preloader.js');
require('../js/script.js');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
   styleUrls: ["../css/bootstrap.min.css",
              "../css/font-awesome.min.css",
              "../css/style.css",
              './profile.component.css']
})
export class ProfileComponent implements OnInit {
  player : any;
  customer : any;
  company: any;
  private subscription: Subscription;


  constructor(private profileService : ProfileService,
              private router : Router,
              private http : Http ) { }

  ngOnInit() {
    this.subscription = Observable.timer(0, 10000)
      .subscribe(() => {
        this.profileService.fetchCustomer().subscribe(Player => {
          this.player = Player
          this.refreshPage()
        },
        err => {
          console.log(err)
          return false
        })
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  loanMoney(){
    this.profileService.takeLoan().subscribe(Customer =>{
      this.customer = Customer
      //console.log(Customer)
      this.refreshPage()
    },
    err => {
      console.log(err)
      return false
    })
  }

  checkLoan(){
    if(this.player.Customer.loan.amount == 0){
      return true
    }
    else{
      return false
    }
  }

  repayMoney(){
    this.profileService.repayLoan().subscribe(Customer =>{
      this.customer = Customer
      //console.log(Customer)
      this.refreshPage()
    },
    err => {
      console.log(err)
      return false
    })
  }

  refreshPage() {
    console.log("Inside refreshPage()")
    this.profileService.fetchCustomer().subscribe(Player => {
      this.player = Player
    },
    err => {
      console.log(err)
      return false
    })
  }

}
