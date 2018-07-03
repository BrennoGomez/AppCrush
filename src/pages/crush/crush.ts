import { CrushProvider } from './../../providers/crush/crush';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CrushPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crush',
  templateUrl: 'crush.html',
})
export class CrushPage {

  dados: Observable<any>;

  constructor(public navCtrl: NavController, public provider: CrushProvider) {
    console.log( this.provider.getAll())
    this.dados = this.provider.getAll();
    
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrushPage');
  }

}
