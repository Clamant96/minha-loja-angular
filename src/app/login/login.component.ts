import { UsuarioService } from './../service/usuario.service';
import { UsuarioLogin } from './../model/UsuarioLogin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

  }

  logar() {
    this.usuarioService.login(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp;

      environment.id = this.usuarioLogin.id;
      environment.username = this.usuarioLogin.username;
      environment.senha = this.usuarioLogin.senha;
      environment.email = this.usuarioLogin.email;
      environment.nome = this.usuarioLogin.nome;
      environment.totalCarrinho = this.usuarioLogin.totalCarrinho;
      environment.img = this.usuarioLogin.img;
      environment.isLogado = true;

      /* ARMAZENA O TOKEN DO USUARIO NO LOCAL STORAGE */
      localStorage.setItem('logado', `${environment.isLogado}`);

      alert('Login realizado com sucesso');

    }, erro => {
      if(erro.status == 500) {
        alert('Usuario ou senha estao incorretos!');

      }

    });

  }

}
