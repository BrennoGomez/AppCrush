import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable()
export class CalcLoveProvider {
  fname:string
  sname : string
  url = "https://love-calculator.p.mashape.com/getPercentage?fname="+this.fname+"&sname="+this.sname;

  apiKey = "nqwBTxtm9dmsh9wK9R3OIjikknLVp1OjQKIjsnAzYZneKyyYZ9";

  nome: string;

  //  headers = new HttpHeaders({'X-Mashape-Key': '6ZRa8CJRmkmshPKj3S9qqNuC8TnDp14XRACjsndxaBJ3ksksPU'});


  constructor(public http: HttpClient) {
    console.log('Hello CalcLoveProvider Provider');

    
  }

  getCalcular() {

      return new Promise(resolve => {
        this.http.get(this.url, { headers: { 'X-Mashape-Key': this.apiKey } }).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  }

  setNames(nome : string, nome2:string){
    this.fname = nome
    this.sname = nome2
    console.log(this.fname);
    this.url = "https://love-calculator.p.mashape.com/getPercentage?fname="+this.fname+"&sname="+this.sname;
    console.log(this.url);
    
  }

 

}
