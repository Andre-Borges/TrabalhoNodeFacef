import ClientesDao from './clientes.dao';
import { CREATED, NO_CONTENT } from 'http-status';
import * as Auth from './../utils/auth.utils';

const clientesDao = new ClientesDao();

export async function list(request, h) {
  return await clientesDao.findAll();
}

export async function detail(request, h) {
  const { id } = request.params;
  return (await clientesDao.findById(id)) || {};
}

export async function create(request, h) {
  const { payload } = request;
  const cliente = await clientesDao.create(payload);
  return h.response(cliente).code(CREATED);
}

export async function update(request, h) {
  const {
    params: { id },
    payload,
  } = request;
  return await clientesDao.update(id, payload);
}

export async function destroy(request, h) {
  const { id } = request.params;
  await clientesDao.destroy(id);
  return h.response().code(NO_CONTENT);
}

export async function login(request, h) {
  const { payload } = request;
  const cliente = await Auth.authenticate(payload);
  const token = Auth.getToken({
    id: cliente.id,
    email: cliente.email,
  });

  return { cliente, token };
}
