import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth'
import * as moment from 'moment';
import { IRate } from '../models/irate';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators'
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RateService {

  private ratesCollection: AngularFireList<IRate>;
  private warehouseCollection: AngularFireList<any>;
  
  constructor(private afAuth: AngularFireAuth, 
              db: AngularFireDatabase,
              private authsvc: AuthenticationService) { 
    this.ratesCollection = db.list("currentrates");
    this.warehouseCollection = db.list("warehouses");
  }

  AddRate(dtKey: string, rate: number): Promise<void>{
           
    let timeFmt = moment(new Date()).format('YYYYMMDD') + 'T';
    timeFmt += moment(new Date()).format('HH:mm:ss');

    let rateObj: IRate =  { source: 'mobile', rate: rate, time: timeFmt };

    return this.ratesCollection.set(dtKey, rateObj);
  } 

  GetWarehouses():Observable<SnapshotAction<any>[]>{
    return this.warehouseCollection.snapshotChanges();
  }
  
  GetLastRate(){
    
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
