import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth'
import * as moment from 'moment';
import { IRate } from '../models/irate';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, mergeMap } from 'rxjs/operators'
import { AuthenticationService } from './authentication.service';
//
//import { DatabaseSnapshotExists, DataSnapshot } from '@angular/fire/database/interfaces';
import { DataSnapshot } from '@angular/fire/database/interfaces';
//
import { ICurrentRate } from '../models/ICurrentRate';


@Injectable({
  providedIn: 'root'
})
export class RateService {

  private ratesCollection: AngularFireList<IRate>;
  private warehouseCollection: AngularFireList<any>;
  private tokensCollection: AngularFireList<any>;
  //
  //  private dataExist: DatabaseSnapshotExists<any>;
  //  private deleteWarehouseById: AngularFireList<any>;
  //private warehouseCollectionEX: AngularFireList<any>;
  //private warehouseCollectionDEV: AngularFireList<any>;
  
  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFireDatabase,
    private authsvc: AuthenticationService
    ){ 
      //this.ratesCollection = db.list("currentrates");
      this.ratesCollection = db.list("currentrates");
      this.warehouseCollection = db.list("warehouses");
      // DESCOMENTAR PARA PRUEBAS EN AMBIENTE DEV.
      // TODO: tratar de hacer configurable esto desde los archivos .env
      // this.warehouseCollectionEX = db.list("devwarehousesEX");
      // this.warehouseCollectionDEV = db.list("devwarehouses");      
      //
      this.tokensCollection = db.list("notifications");
    }

  RegisterToken(token: string){

    //this.tokensCollection.push({"token": token, created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") });
    this.tokensCollection.set(token, { created: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") });
  }

  AddRate(dtKey: string, rate: number): Promise<void>{

    console.log(dtKey);
    console.log(rate);
    let timeFmt = moment(new Date()).format('YYYY-MM-DD') + 'T';
    timeFmt += moment(new Date()).format('HH:mm:ss');

    let rateObj: IRate =  { source: 'mobile', rate: rate, time: timeFmt };

    return this.ratesCollection.set(dtKey, rateObj);
  } 
  //
  // GetWarehousesEX():Observable<SnapshotAction<any>[]>{
  //   return this.warehouseCollectionEX.snapshotChanges();
  // }
  // DeleteWarehouse(warehouse){
  //   //return this.warehouseCollectionDEV.remove(warehouse);
  //   return this.warehouseCollection.remove(warehouse);
  // }
  // AddExcludedRest(warehouse){
  //   return this.warehouseCollectionEX.set(warehouse, "excluido");
  // }
  //
  GetWarehouses():Observable<SnapshotAction<any>[]>{
    return this.warehouseCollection.snapshotChanges();
  }
  
  GetLastRate(): Observable<ICurrentRate>{                  
    return Observable.create(observer=>{
     from(this.ratesCollection.query.ref.orderByKey().limitToLast(1).once('value'))
      .subscribe(f=>{        
        let snapshot : DataSnapshot = f.val();
        let rateKey: string = Object.keys(snapshot)[0];        
        observer.next({ date: moment(rateKey).format('DD/MM/YYYY'),  rate: snapshot[rateKey].rate, updated: snapshot[rateKey].time});
        observer.complete();
      });
    });
  }

  Login(email: string, password: string): Observable<boolean> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password))
      .pipe(switchMap(usrData=>{
        console.log(usrData);
        if (usrData){
          //this.authsvc.authenticationState.next(true);
          return from(this.authsvc.login())
            .pipe(switchMap(()=>{
              return of(true);
              }),
              catchError(err=>{
                console.log("error login rate.service..." + err);
                return of(false);
              }));
        }
        else {
          return from(this.authsvc.logout())
                 .pipe(switchMap(()=>{
                    return of(false);
                 }))                      
        }
      }));
  }
}
