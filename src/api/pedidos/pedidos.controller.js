import PedidosDao from './pedidos.dao';
import { CREATED, NO_CONTENT } from 'http-status';

const pedidosDao = new PedidosDao();

export async function list(request, h) {
  const { params } = request;
  return await pedidosDao.findAll(params);
}

export async function detail(request, h) {
  const { id } = request.params;
  return (await pedidosDao.findByID(id)) || {};
}

export async function create(request, h) {
  const { payload } = request;
  const pedido = await pedidosDao.create(payload);
  return h.response(pedido).code(CREATED);
}

export async function update(request, h) {
  const {
    payload,
    params: { id },
  } = request;
  return await pedidosDao.update(id, payload);
}

export async function destroy(request, h) {
  const { id } = request.params;
  await pedidosDao.destroy(id);
  return h.response().code(NO_CONTENT);
}
