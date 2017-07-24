import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './AuthService';

import 'rxjs/Rx';

@Injectable()
export class CitaService {
  private url:string;
  private headers:Headers;
  private citas:any[] = [];

  constructor(
    private auth:AuthService,
    private http:Http
  ) {
    this.url = "http://localhost:3000/api/v1/cita";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.auth.getToken()
    });
  }

  public getCitas() {
    return this.http.get(this.url, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  public getCita(idCita:any) {
    let uri = `${this.url}/${idCita}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => res.json());
  }

  public nuevoCita(cita:any) {
    let data = JSON.stringify(cita);
    return this.http.post(this.url, data, { headers: this.headers })
    .map(res => res.json());
  }

  public editarCita(cita:any) {
    console.log(cita)
    let uri = `${this.url}/${cita.idCita}`;
    console.log(uri)
    let data = JSON.stringify(cita);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  public eliminarCita(idCita:number) {
    let uri = `${this.url}/${idCita}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}
