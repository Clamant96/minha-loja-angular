import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './../../service/usuario.service';
import { Usuario } from './../../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  public confirmarSenha: string = "";
  public id: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('logado') == null) {
      this.router.navigate(['/login']);

    }

    this.id = this.route.snapshot.params['id'];
    this.getByIdUsuario(this.id);

  }

  /* VERIFICA SE A SENHA CRIADA E MESMA DE CONFIRME SENHA */
  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  getByIdUsuario(id: number) {
    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;

    });

  }

  atualizar() {

    if(this.confirmarSenha.includes(this.usuario.senha)) {

      this.usuarioService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;

        this.router.navigate(['/login']);

      }, erro => {
        if(erro.status == 500) {
          alert('Ocorreu um erro ao tentar atualizar o usuario.');

        }

      });

    }

  }

}
