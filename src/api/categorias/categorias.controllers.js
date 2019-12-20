import CategoriasDao from './categorias.dao';
import { CREATED, NO_CONTENT } from 'http-status';

const categoriasDao = new CategoriasDao();

export async function list (request, h) {
    const { params } = request;
    return await categoriasDao.findAll(params);
};

export async function detail (request, h) { //Rever
    const { params } = request; 
    return await categoriasDao.findById(params) || {};
};

export async function create (request, h) {
    const { payload } = request;
    const categoria = await categoriasDao.create(payload);
    return h.response(categoria).code(CREATED);
};

export async function update (request, h) {
    const { payload, params } = request;
    return await categoriasDao.update(params, payload);
};

export async function destroy (request, h) {
    const { params } = request;
    await categoriasDao.destroy(params);
    return h.response().code(NO_CONTENT);
};
