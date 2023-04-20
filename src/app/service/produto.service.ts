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

      produto.img = environment.nomeUplaodImagem;

      return this.http.post<Produto>(`${this.url}/produto`, produto);
    }

    putProduto(produto: Produto): Observable<Produto> {

      produto.img = environment.nomeUplaodImagem;

      return this.http.put<Produto>(`${this.url}/produto`, produto);
    }

    deleteByIdProduto(id: number): Observable<Produto> {

      return this.http.delete<Produto>(`${this.url}/produto/${id}`);
    }

    // GERENCIAMENTO DE IMAGENS
    uploadImage(image: File): Observable<boolean> {
      const data: FormData = new FormData();

      data.append('type', image.type);
      data.append('file', image);
      data.append('contentType', image);
      data.append('empty', String(false));
      data.append('name', `${environment.username}/${image.name}`);
      data.append('originalFilename', `${environment.username}/${image.name}`);
      data.append('size', String(image.size));

      let nomeArquivo: string = String(this.getRandomInt(100000000, 999999999));

      environment.nomeUplaodImagem = `${nomeArquivo}.${image.name.split(".")[1]}`;

      return this.http.post<boolean>(`${this.url}/upload/${environment.username}/nomeArquivo/${nomeArquivo}`, data);
    }

    findImage(nomeUsuario: string, nomeImagem: string): Observable<File> {

      return this.http.get<File>(`${this.url}/image/carregar/${nomeUsuario}/${nomeImagem}`);
    }

    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    deletaImagemSubstituida(nomeArquivo: string): Observable<boolean> {

      return this.http.delete<boolean>(`${this.url}/upload/${environment.username}/nomeArquivo/${nomeArquivo}`);
    }

}
