import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { IWarehouseWithId } from 'src/app/models/IWarehouseUpdated';
import * as moment from 'moment';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.page.html',
  styleUrls: ['./update-status.page.scss'],
})
export class UpdateStatusPage implements OnInit {

  private currentRateDate:string;

  private warehouses: IWarehouseWithId[];
  /* = [
    { id: 101, date: '09/04/2020', modified: '2020-04-09T09:07:32', status: 'success', updated: '2020-04-09T10:06:50' },
    { id: 103, date: '09/04/2020', modified: '2020-04-09T09:07:32', status: 'success', updated: '2020-04-09T10:06:50' },
    { id: 105, date: '09/04/2020', modified: '2020-04-09T09:07:32', status: 'success', updated: '2020-04-09T10:06:50' },
    { id: 107, date: '08/04/2020', modified: '2020-04-09T09:07:32', status: 'success', updated: '2020-04-09T10:06:50' },
    { id: 108, date: '09/04/2020', modified: '2020-04-09T09:07:32', status: 'success', updated: '2020-04-09T10:06:50' },
    { id: 109, date: '09/04/2020', modified: '2020-04-09T09:07:32', status: 'success', updated: '2020-04-09T10:06:50' },
    { id: 110, date: '09/04/2020', modified: '2020-04-09T09:07:32', status: 'success', updated: '2020-04-09T10:06:50' },
  ] */

  private GroupedWarehouses: any[];  

  private deviceWidth: number;

  constructor(private service: RateService, private platform: Platform) { }

  ngOnInit() {
    this.currentRateDate = moment(new Date()).format("DD/MM/YYYY");

    from(this.platform.ready())
      .pipe(mergeMap(()=>{
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

  splitBy(size: number, list: any[]){
    return list.reduce((acc, curr, i, self) => {
       if (!(i % size)){
         return [...acc, self.slice(i, i + size)];
       }
       return acc;
    }, []);
  }
  

}
