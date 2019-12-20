import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../../api/utils/database.utils';

export default class TagsDao {
    model = instances.getModel('categoria');

    findAll(where) {
        return this.model.findAll({ where });
    }

    async findById(where) {        
        return await getObjectOr404(this.model, { where });
    }

    create(categoria) {
        return this.model.create(categoria);
    }

    async update(where, data) {
        const categoria = await this.findById(where);
        return await categoria.update(data);
    }
    
    async destroy(where) {
        const categoria = await this.findById(where);
        return await categoria.destroy();
    }
};
