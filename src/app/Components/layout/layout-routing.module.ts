import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { authGuard } from '../../custom/auth.guard';

const routes: Routes = [{
  path:"",
  component:LayoutComponent,
  children:[
    {
      path:'usuarios',
      component:UsuarioComponent,
      canActivate:[authGuard]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
