import { Injectable } from '@angular/core';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../interfaces/sesion';
@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackBar:MatSnackBar) { }


  mostrarAlerta(mensaje:string, tipo:string){
    this._snackBar.open(mensaje,tipo,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    })
  }
  guardarSesionUsuario(message: string) {

    const partes = message.split('|');
  

    const sesionUsuario: Sesion = {
      idUsuario: parseInt(partes[0]),     // Convertir el idUsuario a número
      nombre: partes[1],                  // Asignar el nombre
      correo: partes[2],                  // Asignar el correo
      rolDescripcion: partes[3],          // Asignar la descripción del rol
      token: partes[4]                    // Asignar el token
    };
  
  
    localStorage.setItem("sesion", JSON.stringify(sesionUsuario));
  }
  obtenerSesionUsuario(){
    const dataCadena =localStorage.getItem("sesion");
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }
  eliminarSesionUsuario(){
    localStorage.removeItem("sesion")
  }


}
