import PedidosDAO from './pedidos.dao';
import ProdutosDAO from '../produtos/produtos.dao';
import ClientesDAO from '../clientes/clientes.dao';
import Boom from '@hapi/boom';

const pedidosDAO = new PedidosDAO();
const produtosDAO = new ProdutosDAO();
const clientesDAO = new ClientesDAO();
async function validaCliente(id) {
  const hasCliente = await clientesDAO.find(id);
  if (!hasCliente) {
    throw Boom.notAcceptable('Cliente não cadastrado!');
  }
}

export default class PedidosBusiness {
  async list({ query }) {
    return pedidosDAO.findAll(query);
  }

  async detail({ params }) {
    const { id } = params;

    return pedidosDAO.findByID(id);
  }

  async create({ payload }) {
    let valorTotalPedido = 0;

    const { clienteId, produtos } = payload;
    await validaCliente(clienteId);

    for (let product of produtos) {
      let produto_info = await produtosDAO.findByID(product.id);
      if (produto_info.dataValues.quantidade < product.quantidade) {
        throw Boom.notAcceptable(
          'Quantidade não disponivel em estoque produto: ' + product.id,
        );
      }

      produto_info.dataValues.quantidade -= product.quantidade;
      await produtosDAO.update(product.id, produto_info.dataValues);

      valorTotalPedido =
        parseFloat(valorTotalPedido) + parseFloat(produto_info.valor);
    }

    payload.valor = valorTotalPedido;
    return pedidosDAO.create(payload);
  }

  async update({ params, payload }) {
    const { id } = params;
    const { clienteId, produtos } = payload;

    await validaCliente(clienteId);
    if (produtos && produtos.length > 0) {
      for (let product of produtos) {
        let produto_info = await produtosDAO.findByID(product.id);
        if (produto_info.dataValues.quantidade < product.quantidade) {
          throw Boom.notAcceptable(
            'Quantidade não disponivel em estoque produto: ' + product.id,
          );
        }

        produto_info.dataValues.quantidade -= product.quantidade;
        await produtosDAO.update(product.id, produto_info.dataValues);
      }
    }

    return pedidosDAO.update(id, payload);
  }

  async destroy({ params }) {
    const { id } = params;

    return pedidosDAO.destroy(id);
  }
}
