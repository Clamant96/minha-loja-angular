import { Usuario } from './Usuario';
import { Categoria } from './Categoria';

export class Produto {
	public id: number;
	public nome: string;
	public categoria: Categoria;
	public preco: number;
	public qtdEstoque: number;
	public img: string;
	public carrinho: Usuario[];
	public qtdPedidoProduto: number;

}
