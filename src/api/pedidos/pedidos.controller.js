import PedidosDao from './pedidos.dao';
import PedidosBusiness from './pedidos.business';
import { CREATED, NO_CONTENT } from 'http-status';

const pedidosBusiness = new PedidosBusiness();

export async function list(request, h) {
  return await pedidosBusiness.list(request);
}

export async function detail(request, h) {
  return (await pedidosBusiness.detail(request)) || {};
}

export async function create(request, h) {
  const pedido = await pedidosBusiness.create(request);
  return h.response(pedido).code(CREATED);
}

export async function update(request, h) {
  return await pedidosBusiness.update(request);
}

export async function destroy(request, h) {
  await pedidosBusiness.destroy(request);
  return h.response().code(NO_CONTENT);
}
