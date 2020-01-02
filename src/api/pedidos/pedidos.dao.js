import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';
import ProdutosDAO  from '../produtos/produtos.dao';
import Boom from '@hapi/boom';

const produtosDAO = new ProdutosDAO();

export default class PedidosDAO {
  model = instances.getModel('pedido');

  async findAll(where) {
    return this.model.findAll({ where, include: ['cliente'] });
  }

  async findByID(id) {
    return await getObjectOr404(this.model, {
      where: { id },
      include: ['produto'],
    });
  }

  async findProductByID(id) {
    return await getObjectOr404(this.produtos, { where: { id }, include: [ 'categoria' ] });
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const pedido = await this.findByID(id);
    return await pedido.update(data);
  }

  async destroy(id) {
    const pedido = await this.findByID(id);
    return await pedido.destroy(pedido);
  }
}
