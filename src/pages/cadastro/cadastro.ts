import { TabsPage } from './../tabs/tabs';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../providers/auth/usuario';
import { auth } from '../../providers/auth/auth';
import { NgForm } from '@angular/forms';


/**
 * Generated class for the CadastroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  user: Usuario = new Usuario();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private authService: auth) {

  }
  cadastrar() {
    if (this.form.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.authService.cadastrar(this.user)
        .then((user: any) => {
          user.sendEmailVerification();

          toast.setMessage('Usuário criado com sucesso.');
          toast.present();

          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          if (error.code == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }
          toast.present();

        });
    }

  }

  login(){
    this.navCtrl.pop();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
