import { Produto } from './Produto';

export class Usuario {
	public id: number;
	public username: string;
	public senha: string;
	public email: string;
	public nome: string;
	public listaPedidos: Produto[];
	public totalCarrinho: number;
	public img: string;

}
