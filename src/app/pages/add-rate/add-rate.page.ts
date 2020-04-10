import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import  * as  moment from 'moment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-rate',
  templateUrl: './add-rate.page.html',
  styleUrls: ['./add-rate.page.scss'],
})
export class AddRatePage implements OnInit {

  private newRate: number;
  selectedDate: string;

  constructor(private service: RateService) { 

  }

  ngOnInit() {
     this.selectedDate = moment(new Date()).format("YYYY-MM-DD");
  }

  onSubmit(){
     console.log("Ejecutando submit");
     console.log("selectedDate: ", this.selectedDate);
     console.log("newRate: ", this.newRate);

     if (!this.selectedDate || !this.newRate)
       return;

     if (moment(this.selectedDate).isBefore(new Date(), 'day')){
        this.ShowMessage('warning', 'No puede registrar una fecha en el pasado');
        return;
     }

     let daysBetween = moment(this.selectedDate, "YYYY-MM-DD").diff(moment(new Date()).startOf('day'), 'days');
     if (daysBetween > 3){
        this.ShowMessage('warning', 'La fecha elegida esta muy a futuro');
        return;
     }
   
     let dtKey: string =  moment(this.selectedDate).format("YYYYMMDD");   

     let self = this;  //TODO: investigar como evitar esto... si uso el bind me falla el set() de firebase.
     
     this.service.AddRate(dtKey, this.newRate)
       .then(async function(){
          console.log("success");
          self.ShowMessage('success','Nueva Tasa Guardada con Exito!');

       })
       .catch(async err =>{
          console.log(err);
          self.ShowMessage('danger', err);
       });
  }

   async ShowMessage(colorCode: string, message: string){
      const toast = await (new ToastController()).create(
         {
            color: colorCode,
            message: message,
            duration: 3000                
         }
      );
      toast.present();
  }
}

