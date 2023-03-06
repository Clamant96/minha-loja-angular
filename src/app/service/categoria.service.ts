import { Observable } from 'rxjs';
import { Categoria } from './../model/Categoria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  /* URL DA API SPRING */
  public url = environment.apiUrl;

  constructor(
    private http: HttpClient

  ) { }

  getAllCategorias(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.url}/categoria`);
  }

  getByIdCategoria(id: number): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.url}/categoria/${id}`);
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.post<Categoria>(`${this.url}/categoria`, categoria);
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.put<Categoria>(`${this.url}/categoria`, categoria);
  }

  deleteByIdCategoria(id: number): Observable<Categoria> {

    return this.http.delete<Categoria>(`${this.url}/categoria/${id}`);
  }

}
