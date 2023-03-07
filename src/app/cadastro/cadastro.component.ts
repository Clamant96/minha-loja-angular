import { Router } from '@angular/router';
import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  public confirmarSenha: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

  }

  /* VERIFICA SE A SENHA CRIADA E MESMA DE CONFIRME SENHA */
  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  cadastro() {

    if(this.confirmarSenha.includes(this.usuario.senha)) {

      this.usuarioService.postUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;

        this.router.navigate(['/login']);

      }, erro => {
        if(erro.status == 500) {
          alert('Ocorreu um erro ao tentar cadastrar o usuario.');

        }

      });

    }

  }

}
