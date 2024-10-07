import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from '../../../../interfaces/rol';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolService } from '../../../../Services/rol.service';
import { UsuarioService } from '../../../../Services/usuario.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { ModalUsuarioComponent } from '../modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../interfaces/usuario';
import { LoginService } from '../../../../Services/login.service';

@Component({
  selector: 'app-modal-registrarse',
  templateUrl: './modal-registrarse.component.html',
  styleUrl: './modal-registrarse.component.css'
})
export class ModalRegistrarseComponent implements OnInit {
  formularioUsuario:FormGroup;
  ocultarPassword:boolean=true;
  tituloAccion:string="Agregar";
  botonAccion:string="Guardar";
  listaRoles:Rol[]=[];

  constructor(

    private modalActual:MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb:FormBuilder,
    private _rolServicio:RolService,
    private _loginSericio:LoginService,
    private _utilidadServicio:UtilidadService
  ){
    this.formularioUsuario = this.fb.group({
      nombre: ["", Validators.required],  // Corregido: Comillas bien colocadas
      correo: ["", Validators.required], 
      idRol: ["", Validators.required], 
      clave: ["", Validators.required], 
      status: ["1", Validators.required], 
    });

    if(this.datosUsuario !=null){
      this.tituloAccion="Editar";
      this.botonAccion="Actualizar";
    }

    this._rolServicio.listaRoles(1).subscribe({
      next:(data)=>{
        if(data.codigoError===-1){
          this.listaRoles=data.result
        }
      },
      error:(e) =>{}
    })



  }
   ngOnInit(): void {
     if(this.datosUsuario!=null){
      this.formularioUsuario.patchValue({
        nombre: this.datosUsuario.nombre,  // Corregido: Comillas bien colocadas
        correo: this.datosUsuario.correo, 
        idRol: this.datosUsuario.idRol, 
        clave: this.datosUsuario.clave, 
        status: this.datosUsuario.status , 
      })
     }
   }

   guardarEditar_Usuario() {
    const _usuario: Usuario = {
      idUsuario: this.datosUsuario == null ? 0 : this.datosUsuario.idUsuario,
      nombre: this.formularioUsuario.value.nombre,
      correo: this.formularioUsuario.value.correo,
      idRol: 4,
      rolDescripcion: "", 
      clave: this.formularioUsuario.value.clave,
      status: parseInt(this.formularioUsuario.value.status)  // Asegúrate de que esActivo sea convertible a número
    };

    if (this.datosUsuario == null) {
      this._loginSericio.Registrarse(_usuario).subscribe({
        next: (data) => {
          if (data.codigoError === -1) {  // Verificamos si data.status es verdadero
            this._utilidadServicio.mostrarAlerta("El usuario fue registrado", "Éxito");
            this.modalActual.close("true")
          }else{
            this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el usuario", "Error");
          }
        },
        error: (err) => {
          this._utilidadServicio.mostrarAlerta("Ocurrió un error al registrar el usuario", "Error Final");
          console.error(err);  // Opcional, para depurar en caso de error
        }
      });
    }
  }
}
