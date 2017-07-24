import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TareaService } from '../../app/services/TareaService';
import { TareaFormPage } from './tarea-form';

@Component({
  selector: 'page-tareas',
  templateUrl: 'tareas.html'
})
export class TareasPage {
  private tareas:any[] = [];

  constructor(
    public navCtrl: NavController,
    private toast: ToastController,
    public tareaService: TareaService
  ) {
    this.inicializar();
  }

  private inicializar() {
    this.tareaService.getTareas()
    .subscribe(tareas => this.tareas = tareas);
  }

  public verFormulario(parametro:any) {
    this.navCtrl.push(TareaFormPage, { parametro });
  }
  public eliminarTarea(idTarea:any){
    this.tareaService.eliminarTarea(idTarea)
    .subscribe(res => {
      this.toast.create({
        message: res.mensaje,
        duration: 2000
      }).present();

      this.inicializar();
    })
  }
}
