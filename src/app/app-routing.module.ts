import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* ACESSO VAZIO */
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
/* ============  */
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'cadastro',
  component: CadastroComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
