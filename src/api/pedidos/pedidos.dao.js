import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

export default class PedidosDAO {
  model = instances.getModel('pedido');
  produtoModel = instances.getModel('produto');

  async findAll(where) {
    return this.model.findAll({
      where,
      include: [
        'cliente',
        {
          model: this.produtoModel,
          as: 'produtos',
          through: { attributes: ['quantidade'] },
          attributes: ['id', 'descricao', 'valor'],
        },
      ],
    });
  }

  async findByID(id) {
    return await getObjectOr404(this.model, {
      where: { id },
      include: [
        'cliente',
        {
          model: this.produtoModel,
          as: 'produtos',
          through: { attributes: ['quantidade'] },
          attributes: ['id', 'descricao', 'valor'],
        },
      ],
    });
  }

  async create(data) {
    const { produtos } = data;
    const pedido = await this.model.create(data);

    if (produtos && produtos.length > 0) {
      for (const produto of produtos) {
        const { id, quantidade } = produto;
        await pedido.addProdutos(id, { through: { quantidade: quantidade } });
      }
    }

    return await this.findByID(pedido.id);
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
