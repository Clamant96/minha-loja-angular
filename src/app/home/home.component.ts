import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../model/Categoria';
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
  public listaDeCategorias: Categoria[] = [];
  public id: number = environment.id;

  public carrinho: Usuario = new Usuario();

  public gerenciaProduto: Produto = new Produto();
  public gerenciaProdutoEdcao: Produto = new Produto();
  public gerenciaCategoria: Categoria = new Categoria();

  public isEdicaoProduto: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(localStorage.getItem('logado') == null) {
      this.router.navigate(['/login']);

    }

    this.gerenciaProduto.img = "https://cdn-icons-png.flaticon.com/512/1695/1695213.png";

    this.getAllProdutos();
    this.getAllCategorias();

  }

  getAllProdutos() {

    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    });

  }

  getAllCategorias() {

    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaDeCategorias = resp;

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

  renderizarPreco(preco: number) {
    let retorno: string = preco.toString();

    retorno = retorno.replace('.', ',');

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

  changeCategoria(event: any) {
    this.gerenciaCategoria.id = event.target.value;

    console.log(this.gerenciaCategoria);

  }

  cadastrarProduto(produto: Produto) {

    produto.categoria = this.gerenciaCategoria;

    this.produtoService.postProduto(produto).subscribe((resp: Produto) => {
      this.gerenciaProduto = new Produto();
      this.gerenciaCategoria = new Categoria();

      this.gerenciaProduto.img = "https://cdn-icons-png.flaticon.com/512/1695/1695213.png";

      this.getAllProdutos();

    }, erro => {
      alert('Ocorreu um erro ao tentar cadastrar o produto.');

    });

  }

  gerenciaBotaoEdicaoProduto(estado: boolean, produto: Produto) {

    if(estado) {
      this.isEdicaoProduto = false;

    }else {
      this.isEdicaoProduto = true;

      this.gerenciaProdutoEdcao = new Produto();
      this.gerenciaProdutoEdcao = produto;

    }

    return estado;
  }

  atualizarProduto(produto: Produto) {

    this.produtoService.putProduto(produto).subscribe((resp: Produto) => {
      this.gerenciaProduto = new Produto();
      this.gerenciaProdutoEdcao = new Produto();
      this.gerenciaCategoria = new Categoria();

      this.isEdicaoProduto = false;

      this.gerenciaProduto.img = "https://cdn-icons-png.flaticon.com/512/1695/1695213.png";

      this.getAllProdutos();

    }, erro => {
      alert('Ocorreu um erro ao tentar atualizar o produto.');

      this.isEdicaoProduto = false;

    });

  }

}
