import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CitaService } from '../../app/services/CitaService';
import { CitaFormPage } from './cita-form';

@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html'
})
export class CitasPage {
  private citas:any[] = [];

  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    public citaService: CitaService
  ) {
    this.inicializar();
  }

  private inicializar() {
    this.citaService.getCitas()
    .subscribe(citas => this.citas = citas);
  }

  public logout(){
  window.location.reload();
  }

  public verFormulario(parametro:any) {
    this.navCtrl.push(CitaFormPage, { parametro });
  }

  public eliminarCita(idCita:any){
    this.citaService.eliminarCita(idCita)
    .subscribe(res => {
      this.toast.create({
        message: res.mensaje,
        duration: 2000
      }).present();

      this.inicializar();
    })
  }
}
