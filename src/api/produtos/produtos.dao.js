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
        return await this.model.create(data);
    }

    async update(id, data) {
        const produto = await this.findByID(id);
        return await produto.update(data);
    }

    async destroy(id) {
        const produto = await this.findByID(id);
        return await produto.destroy(produto);
    }
}