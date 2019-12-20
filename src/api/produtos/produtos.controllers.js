import ProdutosDao from './produtos.dao';
import { CREATED, NO_CONTENT } from 'http-status';

const produtosDao = new ProdutosDao();

export async function list (request, h) {
    const { params } = request;
    return await produtosDao.findAll(params);
};

export async function detail (request, h) { //Rever
    const { id } = request.params; 
    return await produtosDao.findByID(id) || {};
};

export async function create (request, h) {
    const { payload } = request;
    const produto = await produtosDao.create(payload);
    return h.response(produto).code(CREATED);
};

export async function update (request, h) {
    const { payload, params: { id } } = request;
    return await produtosDao.update(id, payload);
};

export async function destroy (request, h) {
    const { id } = request.params;
    await produtosDao.destroy(id);
    return h.response().code(NO_CONTENT);
};
