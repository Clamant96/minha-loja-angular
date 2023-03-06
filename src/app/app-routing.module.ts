import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* ACESSO VAZIO */
{
  path: '',
  //redirectTo: 'login',
  redirectTo: 'login',
  pathMatch: 'full'
},
/* ============  */
{
  path: 'login',
  component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
