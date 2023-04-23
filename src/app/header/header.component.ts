import { ProdutoService } from './../service/produto.service';
import { Produto } from './../model/Produto';
import { Router } from '@angular/router';
import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../model/Usuario';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() carrinho: Usuario;
  @Input() totalDeItensCarrinho: number;

  public img: string = environment.img;
  public nome: string = environment.nome;
  public id: number = environment.id;
  public username: string = environment.username;

  public url: string = environment.apiUrl;

  //public totalDeItensCarrinho: number = 0;

  public gerenciaDropdown: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('logado') == null) {
      this.router.navigate(['/login']);

    }

    if(this.id > 0) {
      this.getByIdCarrinhoUsuario(this.id);

    }

  }

  getByIdCarrinhoUsuario(id: number) {
    this.totalDeItensCarrinho = 0;

    this.usuarioService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      resp.listaPedidos.map((produto) => {
        this.totalDeItensCarrinho = this.totalDeItensCarrinho + produto.qtdPedidoProduto;

      });

      this.carrinho = resp;

    });

  }

  renderizaTexto(texto: string) {

    let retorno: string = "";

    for(let i = 0; i < 49; i++) {
      retorno = retorno + texto.charAt(i);

    }

    if(texto.length > 49) {
      retorno = retorno + "..."

    }

    return retorno;
  }

  removerItem(produto: Produto, idUsuario: number) {
    this.produtoService.devolverProduto(produto.id, idUsuario).subscribe((resp: Produto) => {

      this.getByIdCarrinhoUsuario(idUsuario);

    }, erro => {
      alert('Ocorreu um erro ao tentar excluir o produto do carrinho.');

    });

  }

  abrirDropdown(trava: boolean) {

    if(!trava) {
      window.document.querySelector('header nav a .dropdown')?.setAttribute('style', 'display: block !important;');
      this.gerenciaDropdown = true;

    }else{
      window.document.querySelector('header nav a .dropdown')?.setAttribute('style', 'display: none !important;');
      this.gerenciaDropdown = false;

    }

  }

  logout() {
    environment.id = 0;
    environment.username = "";
    environment.senha = "";
    environment.email = "";
    environment.nome = "";
    environment.totalCarrinho = 0.0;
    environment.img = "";
    environment.isLogado = false;

    localStorage.removeItem('logado');

    this.router.navigate(['/login']);

  }

  renderizarPreco(preco: number) {
    let retorno: string = "";

    try {
      retorno = preco.toString();

      retorno = retorno.replace('.', ',');

    }catch(err) {

    }

    return retorno;
  }

}
