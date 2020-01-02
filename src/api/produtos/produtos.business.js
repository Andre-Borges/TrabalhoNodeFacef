import ProdutosDAO from './produtos.dao';
import CategoriasDAO from '../categorias/categorias.dao';
import Boom from '@hapi/boom';

const produtosDAO = new ProdutosDAO();
const categoriasDAO = new CategoriasDAO();

export default class ProdutosBusiness {
  async list({ query }) {
    return produtosDAO.findAll(query);
  }

  async detail({ params }) {
    const { id } = params;

    return produtosDAO.findByID(id);
  }

  async create({ payload }) {
    const { categoriaId: id } = payload;

    const hasCategoria = await categoriasDAO.find({ id });
    if (!hasCategoria) {
      throw Boom.notAcceptable('Categoria Inexistente!');
    }

    return produtosDAO.create(payload);
  }

  async update({ params, payload }) {
    const { id } = params;

    return produtosDAO.update(id, payload);
  }

  async destroy({ params }) {
    const { id } = params;

    return produtosDAO.destroy(id);
  }
}