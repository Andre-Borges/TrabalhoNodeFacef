import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

export default class PedidosAO {
  model = instances.getModel('pedido');

  async findAll(where) {
    return this.model.findAll({ where, include: ['produto'] });
  }

  async findByID(id) {
    return await getObjectOr404(this.model, {
      where: { id },
      include: ['produto'],
    });
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
