import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { IWarehouseWithId } from 'src/app/models/IWarehouseUpdated';
import * as moment from 'moment';

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

  constructor(private service: RateService) { }

  ngOnInit() {
    this.currentRateDate = moment(new Date()).format("DD/MM/YYYY");
    this.service.GetWarehouses().subscribe(data=>{      
      this.warehouses =  data.map(f=>{
        let result : IWarehouseWithId;
        result= { id: f.payload.key, ...f.payload.val()};
        return result;
      });
      this.GroupedWarehouses = this.splitBy(4,this.warehouses);

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
