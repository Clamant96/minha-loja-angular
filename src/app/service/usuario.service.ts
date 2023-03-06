import { UsuarioLogin } from './../model/UsuarioLogin';
import { Observable } from 'rxjs';
import { Usuario } from './../model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /* URL DA API SPRING */
  public url = environment.apiUrl;

  constructor(
    private http: HttpClient

  ) { }

  getAllUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.url}/usuario`);
  }

  getByIdUsuario(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.url}/usuario/${id}`);
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.url}/usuario`, usuario);
  }

  login(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {

    return this.http.post<UsuarioLogin>(`${this.url}/usuario/login`, usuarioLogin);
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {

    return this.http.put<Usuario>(`${this.url}/usuario`, usuario);
  }

  deleteByIdUsuario(id: number): Observable<Usuario> {

    return this.http.delete<Usuario>(`${this.url}/usuario/${id}`);
  }

}
