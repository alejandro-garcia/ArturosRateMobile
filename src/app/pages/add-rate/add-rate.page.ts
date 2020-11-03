import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
//
import { AlertController, ToastController } from '@ionic/angular';
import { ModalController, NavController, Platform } from '@ionic/angular';
//
import  * as  moment from 'moment';

@Component({
  selector: 'app-add-rate',
  templateUrl: './add-rate.page.html',
  styleUrls: ['./add-rate.page.scss'],
})
export class AddRatePage implements OnInit {

   private newRate: number;
   selectedDate: string;

   constructor(private service: RateService, public alertController: AlertController,public navCtrl: NavController) {}

   ngOnInit() {
      this.selectedDate = moment(new Date()).format("YYYY-MM-DD");
   }

   onSubmit(){
      console.info("Ejecutando submit");
      console.info("===================");
      console.info("selectedDate: ", this.selectedDate);
      console.info("newRate: ", this.newRate);
      console.info("===================");

      const Momentjs = moment();
      let self = this;  //TODO: investigar como evitar esto... si uso el bind me falla el set() de firebase.

      if(this.newRate == null || this.newRate == undefined || this.newRate == 0){
         self.ShowMessage('danger', "Ingrese una Tasa valida por favor.",3200);
      }

      if (!this.selectedDate || !this.newRate)
         return;

      if (moment(this.selectedDate).isBefore(new Date(), 'day')){
         this.ShowMessage('warning', 'No puede registrar una fecha en el pasado',0);
         return;
      }

      let daysBetween = moment(this.selectedDate, "YYYY-MM-DD").diff(moment(new Date()).startOf('day'), 'days');
      if (daysBetween > 3){
         this.ShowMessage('warning', 'La fecha elegida esta muy a futuro',0);
         return;
      }
      
      let dtKey: string =  moment(this.selectedDate).format("YYYYMMDD");   

      const dateNow = Momentjs.format('YYYY-MM-DD').replace("-","").replace("-","");
      const timeNow = Momentjs.format('HH:mm');
      const timeBegin = moment(timeNow, 'HH:mm');
      const timeClosed = moment('12:05', 'HH:mm');//9am tope
      //console.log(dateNow);
      //console.log(timeNow);
      //console.log(dtKey);
      //console.log(this.selectedDate.toString());//Devuelve Milisegundos
      //
      
      if(dtKey == dateNow){
         //this.pressAlertConfirm(self,this.service,dtKey,this.newRate,timeBegin,timeClosed);
         this.pressAlertConfirm(self,timeBegin,timeClosed,dtKey);
      }else{
         console.info("Fecha distinta a la de hoy.");               
         
         this.service.AddRate(dtKey, this.newRate)
            .then(async function(){
               console.log("success");
               self.ShowMessage('success','Nueva Tasa Guardada con Exito!',3200);
            })
            .catch(async err =>{
               console.log(err);
               self.ShowMessage('danger', err, 3500);
            });
      }     
   }

   async ShowMessage(colorCode: string, message: string, duration : number){
      const toast = await (new ToastController()).create(
         {
            color: colorCode,
            message: message,
            duration: duration == 0 ? duration = 1000 : duration
         }
      );
      toast.present();
   }

   //async pressAlertConfirm(self,servicioTasa,dtKey,newRate,timeBegin,timeClosed){
   async pressAlertConfirm(self,timeBegin,timeClosed,dtKey){
      console.log("Validacion: -> pressAlertConfirm");
      const alert = await this.alertController.create(
         {
            header : 'Confirmar',
            message : '<strong>¿Seguro quiere usar la fecha de hoy para la Tasa?</strong>',
            buttons : [
               {
                  text : 'Cancel',
                  role : 'Cancel',
                  cssClass : 'secondary',
                  handler : (e) => {
                     console.info("Ey bro cancelaste!!")
                  }
               },
               {
                  text : 'Continuar',
                  handler : () => {
                     if(this.isBeforeOrSameHours(timeBegin,timeClosed)){
                        this.service.AddRate(dtKey, self.newRate)
                           .then(async function(){
                              console.log("success");
                              self.ShowMessage('success','Nueva Tasa Guardada con Exito!');
                           })
                           .catch(async err =>{
                              console.log(err);
                              self.ShowMessage('danger', err);
                           });
                           self.ShowMessage('success','Nueva Tasa Guardada con Exito!');
                     }else{
                        self.ShowMessage('danger', "El horario para cargar tasa ya paso. Intente mas tarde.");
                     }
                  }
               }
            ]
         }
      );
      
      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
   
   }

   isBeforeOrSameHours(timeBegin,timeClosed){
      if(!timeBegin.isSameOrBefore(timeClosed)){
         console.trace("La Hora es mayor a la permitida -> " + timeClosed);
         return false;
      }else{
         console.log("La hora esta dentro del rango." + timeBegin);
         return true;
      }
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
