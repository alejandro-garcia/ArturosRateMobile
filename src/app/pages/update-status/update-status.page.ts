import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { IWarehouseWithId } from 'src/app/models/IWarehouseUpdated';
import * as moment from 'moment';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { mergeMap, zip } from 'rxjs/operators';
import { ICurrentRate } from 'src/app/models/ICurrentRate';
import { SnapshotAction } from '@angular/fire/database/database';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.page.html',
  styleUrls: ['./update-status.page.scss'],
})
export class UpdateStatusPage implements OnInit {

  private currentRateDate:string;
  private warehouses: IWarehouseWithId[];
  private GroupedWarehouses: any[];  
  private deviceWidth: number;
  private lastRate: ICurrentRate;
  private isMobile: boolean;

  constructor(private service: RateService, private platform: Platform,public navCtrl: NavController) { }

  ngOnInit() {
    this.currentRateDate = moment(new Date()).format("DD/MM/YYYY")
    this.lastRate = {date: 'N/A',rate: 0,updated: 'N/A'}

    from(this.platform.ready())
      .pipe(
        mergeMap(()=> this.service.GetLastRate()),
        mergeMap((rateInfo)=>{       
          this.lastRate = rateInfo;
          return this.service.GetWarehouses();
        }))
      .subscribe(data=>{      
        this.warehouses =  data.map(f=>{
          let result : IWarehouseWithId;
          result= { id: f.payload.key, ...f.payload.val()};
          return result;
        });

        let rowSize: number = 4;
        this.deviceWidth = this.platform.width();
        console.log("deviceWidth:" + this.deviceWidth.toString())
        
        this.isMobile = false;

        if (this.platform.platforms().some(r=>r == "cordova" || r == "capacitor")){
          this.isMobile = true;
          rowSize = 4;

          if (this.deviceWidth < 393)
              rowSize = 3;
          else if(this.deviceWidth >= 480)
              rowSize = 5;          
        } else { 
          if (this.deviceWidth >= 720)
            rowSize = 5;
          else if(this.deviceWidth > 480)
            rowSize = 4;
        }

          
        this.GroupedWarehouses = this.splitBy(rowSize,this.warehouses);

        console.log(this.GroupedWarehouses);
      }, 
      err=>{
        console.log("error...");
        console.log(err);
      }
    )
  }

  splitBy(size: number, list: any[]){
    return list.reduce((acc, curr, i, self) => {
       if (!(i % size)){
         return [...acc, self.slice(i, i + size)];
       }
       return acc;
    }, []);
  }
  
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.navCtrl.navigateRoot("/");
      event.target.complete();  
      console.log("refresh")
    },1000);
    
  }

}
