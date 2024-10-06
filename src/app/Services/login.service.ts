import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { ResponseApi } from '../interfaces/response-api';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi:string=environment.apiUrl + "Login/";

  constructor(private http:HttpClient) { }

  IniciarSesion(request:Login):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}inicioSesion`, request);
  }

  Registrarse(request:Usuario):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}registrarse`, request);
  }

}
