import { Produto } from './../model/Produto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  /* URL DA API SPRING */
  public url = environment.apiUrl;

  constructor(
    private http: HttpClient

  ) { }

    getAllProdutos(): Observable<Produto[]> {

      return this.http.get<Produto[]>(`${this.url}/produto`);
    }

    getByIdProduto(id: number): Observable<Produto> {

      return this.http.get<Produto>(`${this.url}/produto/${id}`);
    }

    comprarProduto(idProduto: number, idUsuario: number): Observable<Produto> {

      return this.http.get<Produto>(`${this.url}/produto/produto_pedido/comprar/idproduto/${idProduto}/idusuario/${idUsuario}`);
    }

    devolverProduto(idProduto: number, idUsuario: number): Observable<Produto> {

      return this.http.get<Produto>(`${this.url}/produto/produto_pedido/devolver/idproduto/${idProduto}/idusuario/${idUsuario}`);
    }

    postProduto(produto: Produto): Observable<Produto> {

      return this.http.post<Produto>(`${this.url}/produto`, produto);
    }

    putProduto(produto: Produto): Observable<Produto> {

      return this.http.put<Produto>(`${this.url}/produto`, produto);
    }

    deleteByIdProduto(id: number): Observable<Produto> {

      return this.http.delete<Produto>(`${this.url}/produto/${id}`);
    }

}
