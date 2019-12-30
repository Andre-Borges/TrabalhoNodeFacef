import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

export default class ProdutosDAO {
    model = instances.getModel('produto');

    async findAll(where) {
        return this.model.findAll({ where, include: [ 'categoria' ] });
    }

    async findByID(id) {
        return await getObjectOr404(this.model, { where: { id }, include: [ 'categoria' ] });
    }

    async create(data) {
        // todo - Validar se a categoria existe antes de criar o produto

        return this.model.create(data);
    }

    async update(id, data) {
        const produto = await this.findByID(id);
        return produto.update(data);
    }

    async destroy(id) {
        const produto = await this.findByID(id);
        return produto.destroy(produto);
    }
}