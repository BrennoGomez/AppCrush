import { TabsPage } from './../tabs/tabs';
import { CadastroPage } from './../cadastro/cadastro';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../providers/auth/usuario';
import { auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: Usuario = new Usuario();
  @ViewChild('form') form: NgForm;
  CadastroPage = CadastroPage;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: auth,
  public NavParams: NavParams) {
  }

  login() {
    if (this.form.form.valid) {
      this.authService.login(this.user)
        .then(() => {
          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present();
        });
    }

  }

  cadastrar(){
    this.navCtrl.push(CadastroPage);
  }

 

}
