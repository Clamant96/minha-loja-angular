import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../model/Usuario';
import { Router } from '@angular/router';
import { Produto } from './../model/Produto';
import { ProdutoService } from './../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaDeProdutos: Produto[] = [];
  public id: number = environment.id;

  public carrinho: Usuario = new Usuario();

  constructor(
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('logado') == null) {
      this.router.navigate(['/login']);

    }

    this.getAllProdutos();

  }

  getAllProdutos() {

    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    });

  }

  renderizaTexto(texto: string) {

    let retorno: string = "";

    for(let i = 0; i < 71; i++) {
      retorno = retorno + texto.charAt(i);

    }

    if(texto.length > 71) {
      retorno = retorno + "..."

    }

    return retorno;
  }

  comprarProduto(produto: Produto) {
    this.produtoService.comprarProduto(produto.id, this.id).subscribe((resp: Produto) => {

      setTimeout(() => {

        this.usuarioService.getByIdUsuario(this.id).subscribe((resp: Usuario) => {

          this.carrinho = resp;

        });

      }, 50);

    }, erro => {
      alert('Ocorreu um erro ao tentar comprar o produto.');

    });

  }

}
