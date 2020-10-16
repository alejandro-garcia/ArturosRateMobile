import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertController, IonicModule, Platform, ToastController } from '@ionic/angular';

import { ExcludeRestPageRoutingModule } from './exclude-rest-routing.module';
import { RateService } from 'src/app/services/rate.service';
import * as moment from 'moment';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IWarehouseWithId } from 'src/app/models/IWarehouseUpdated';
import { ICurrentRate } from 'src/app/models/ICurrentRate';

@Component({
  selector: 'app-exclude-rest',
  templateUrl: './exclude-rest.page.html',
  styleUrls: ['./exclude-rest.page.scss'],
})
export class ExcludeRestPage implements OnInit {

  private excludedRest : string;
  //
  private currentRateDate:string;
  private warehouses: IWarehouseWithId[];
  private GroupedWarehouses: any[];  
  private deviceWidth: number;
  private lastRate: ICurrentRate;

  constructor(private service: RateService, public alertController: AlertController,private platform: Platform) {}

  ngOnInit() {

    /*** WAREHOUSES ***/

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

          let rowSize: number = 3;
          this.deviceWidth = this.platform.width();
          console.log("deviceWidth:" + this.deviceWidth.toString())
          
          if (this.deviceWidth >= 720)
            rowSize = 5;
          else if(this.deviceWidth > 480)
            rowSize = 4;
            
          this.GroupedWarehouses = this.splitBy(rowSize,this.warehouses);

          console.log(this.GroupedWarehouses);
        }, 
        err=>{
          console.log("error...");
          console.log(err);
        }
      )
  
  }

  onSubmit(){
      console.info("Ejecutando submit");
      console.info("===================");
      console.info("excludedRest: ", this.excludedRest);
      console.info("===================");

      let self = this;
      const excluidos = ["111", "222", "333"]
      const noExcluidos = ["444","555","666"]

      const rest = this.service.GetWarehouses();
      console.log(rest);

      const excludedRest = excluidos.find(e=> e == this.excludedRest.toString()) ? "excluido" : this.excludedRest;
      
      if( excludedRest == "excluido"){
        self.ShowMessage('danger', "ya se encuentra excluido", 0);
      }else{
        !this.service.DeleteWarehouse(excludedRest.toString()) ? self.ShowMessage('danger', "Error", 0) : self.ShowMessage('success','Se ha excluido',0)
      }

  }

  splitBy(size: number, list: any[]){
    return list.reduce((acc, curr, i, self) => {
       if (!(i % size)){
         return [...acc, self.slice(i, i + size)];
       }
       return acc;
    }, []);
  }

  async ShowMessage(colorCode: string, message: string, duration : number){
      const toast = await (new ToastController()).create(
         {
            color: colorCode,
            message: message,
            duration: duration == 0 ? duration = 3000 : duration
         }
      );
      toast.present();
  }

}
