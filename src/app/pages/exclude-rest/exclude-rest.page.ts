import { Component, OnInit } from '@angular/core';
import { RateService } from 'src/app/services/rate.service';
import { MenssageService } from 'src/app/services/menssage.service';
import { AlertController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-exclude-rest',
  templateUrl: './exclude-rest.page.html',
  styleUrls: ['./exclude-rest.page.scss'],
})
export class ExcludeRestPage implements OnInit {

  private excludedRest : string;
  private dataRestaurantsExcluded;
  private dataRestaurants;
  //
  private restaurantsExcluded = this.service.GetWarehousesEX();
  private restaurants = this.service.GetWarehouses();
  private deviceWidth: number;
  private GroupedWarehouses: any[];  

  constructor(
    private service: RateService, private menssageService : MenssageService, 
    public alertController: AlertController,  private platform: Platform, 
    public navCtrl: NavController) {}

  ngOnInit() {

    this.restaurantsExcluded.subscribe(
      data =>{

        this.dataRestaurantsExcluded = data.map(
          obj=>{
            let result;
            result= { id: obj.key};
            return result;
          }
        );

        let rowSize: number = 3;
        this.deviceWidth = this.platform.width();
        //console.log("deviceWidth:" + this.deviceWidth.toString());
        if (this.deviceWidth >= 720)
          rowSize = 5;
        else if(this.deviceWidth > 480)
          rowSize = 4;
          
        this.GroupedWarehouses = this.splitBy(rowSize,this.dataRestaurantsExcluded);
      }
    );

  }

  onSubmit(){
      console.info("Ejecutando submit");
      console.info("===================");
      console.info("excludedRest: ", this.excludedRest);
      console.info("===================");
      let self = this;

      this.restaurantsExcluded.subscribe(
        data =>{
          this.dataRestaurantsExcluded = data.map(
            obj => { let result; result= { id: obj.key}; return result; }
          );
          //
          const filterRestEX = this.dataRestaurantsExcluded.find(e=> e.id == this.excludedRest.trim().toString()) ? "excluido" : this.excludedRest;
          console.log(filterRestEX)
          if(filterRestEX == "excluido"){
            this.menssageService.ShowMessage('warning', "Este Restaurante ya esta Excluido", 0);
          }else{
            this.restaurants.subscribe(
              data =>{
                this.dataRestaurants = data.map(
                  obj=>{
                    let result;
                    result= { id: obj.key};
                    return result;
                  }
                );
                //
                const filterRest = this.dataRestaurants.find(e=> e.id == this.excludedRest.toString());
                if(filterRest){
                  this.pressAlertConfirm();
                }else{
                  this.menssageService.ShowMessage('warning','Este Restaurant No existe.',0)
                }
            });
          }

        }
      );
  
  }

  /* FUNCTIONS */

  async pressAlertConfirm(){
      console.log("Validacion: -> pressAlertConfirm");
      const alert = await this.alertController.create(
         {
            header : 'Confirmar',
            message : '<strong>¿Quieres excluir a '+ this.excludedRest + ' ?</strong>',
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
                   if(this.service.DeleteWarehouse(this.excludedRest.trim().toString())){
                     if(this.service.AddExcludedRest(this.excludedRest.trim().toString())){
                       this.menssageService.ShowMessage('success','Restaurante Excluido con Exito!',0);
                     }else{
                       this.menssageService.ShowMessage('danger', "Hubo un Error, intente mas tarde.", 0);
                     }
                   }else{
                     this.menssageService.ShowMessage('danger', "Hubo un Error, intente mas tarde.", 0);
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

  splitBy(size: number, list: any[]){
    return list.reduce((acc, curr, i, self) => {
       if (!(i % size)){
         return [...acc, self.slice(i, i + size)];
       }
       return acc;
    }, []);
  }

  doRefresh(event){
    console.log('Begin async operation');

    setTimeout(() => {
      this.navCtrl.navigateRoot("exclude-rest");
      event.target.complete();  
      console.log("refresh")
    },3000);
    
  }

}
