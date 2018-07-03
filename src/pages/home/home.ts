import { CrushProvider } from './../../providers/crush/crush';
import { CalcLoveProvider } from './../../providers/calc-love/calc-love';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dados:any = {fname: "", sname: "", percentage: "", result: ""};
  fname = "";
  sname = "";
  form: FormGroup;

  visao = true;

  picdata : any;
  picurl : any;
  mypicref : any;
  
  constructor( public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private calc: CalcLoveProvider,
    private toast: ToastController, private provider : CrushProvider) {
 
    this.dados = { };
    this.createForm();

    this.mypicref = firebase.storage().ref('/')
 
    if (this.navParams.data.key) {
      const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
        subscribe.unsubscribe();
 
        this.dados = c;
        this.createForm();
      })
    }
  
  }

  get(){
    this.calc.setNames(this.fname, this.sname);
    this.calc.getCalcular()
    .then(data => {
      this.dados = data;
      console.log(this.dados);
      this.onSubmit();
      this.visao = false;
    });
    
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.dados.key],
      fname: [this.dados.fname, Validators.required],
      sname: [this.dados.sname, Validators.required],
   
    });
  }
 
  onSubmit() {
   
    if (this.form.valid) {
      this.provider.save(this.dados)
        .then(() => {
          this.toast.create({ message: 'Contato salvo com sucesso.', duration: 3000 }).present();
          
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000 }).present();
          console.error(e);
        })
    }
   
  }

  takepic(){
    Camera.getPicture({
      quality:100,
      destinationType:Camera.DestinationType.DATA_URL,
      sourceType:Camera.PictureSourceType.CAMERA,
      encodingType:Camera.EncodingType.PNG,
      saveToPhotoAlbum:true
    }).then(imageData=>{
      this.picdata=imageData;
      this.upload()
    })
  }

  upload(){
    this.mypicref.child(this.uid()).child('pic.png')
    .putString(this.picdata, 'base64', {contentType:'image/png'})
    .then(savepic=>{
      this.picurl=savepic.downloadURL
    })
  }

  uid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
