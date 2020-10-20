import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MenssageService {

  constructor() { }

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
