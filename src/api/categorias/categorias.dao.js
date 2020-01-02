import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../../api/utils/database.utils';

export default class CategoriasDAO {
    model = instances.getModel('categoria');

    findAll(where) {
        return this.model.findAll({ where });
    }

    async find(where) {
        return this.model.findOne({ where });
    }

    async findByID(where) {
        return await getObjectOr404(this.model, { where });
    }

    async create(categoria) {
        return this.model.create(categoria);
    }

    async update(where, data) {
        const categoria = await this.findByID(where);
        return categoria.update(data);
    }

    async destroy(where) {
        const categoria = await this.findByID(where);
        return await categoria.destroy();
    }
};
