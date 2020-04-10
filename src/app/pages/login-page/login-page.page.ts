import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  private email: string;
  private password: string;

  constructor(private service: RateService) {  }

  ngOnInit() {
    this.email = "exchanges@arturos.com.ve";
  }

  onSubmit(){
    console.log("Ejecutando submit");
    if (!this.email){
      this.ShowMessage("warning", "Debe ingresar el correo");
      return;
    }

    if (!this.password){
      this.ShowMessage("warning", "Debe especificar la contraseña");
      return;
    }

    this.service.Login(this.email, this.password).subscribe();
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
