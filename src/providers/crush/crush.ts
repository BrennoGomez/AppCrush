import { Observable } from '@firebase/util';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

interface Dados {
  key: string,
  fname: string,
  sname:string,
  percentage:string,
  result: string
}
@Injectable()
export class CrushProvider {

  private PATH = "Crush/"

  constructor(public db: AngularFireDatabase) {

  }



  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }


  get(Key: String) {

    return this.db.object(this.PATH + Key)
      .snapshotChanges()
      .map(
        c => { return { key: c.payload.key, ...c.payload.val() }; }

      )

  }

  save(dados: any) {
    console.log("segundo");
    
    return new Promise((resolve, reject) => {
      if (dados.key) {
        this.db.list(this.PATH)
          .update(dados.key, { fname: dados.fname, sname: dados.sname, result: dados.result, pepercentage: dados.percentage  })
          .then(() => resolve())
          .catch((e) => reject(e));

      } else {
        this.db.list(this.PATH)
          .push( { fname: dados.fname, sname: dados.sname, result: dados.result, pepercentage: dados.percentage  })
          .then(() => resolve());
      }
    })

  }

  remove(key: string) {

    return this.db.list(this.PATH).remove(key);

  }


}
