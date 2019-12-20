import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

export default class ClientesDAO {
    model = instances.getModel('cliente');
  
    async findAll(where) {
        return this.model.findAll({ where });
    }

    async findByID(id) {
        return await getObjectOr404(this.model, { where: { id } });
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        const cliente = await this.findByID(id);
        return await cliente.update(data);
    }

    async destroy(id) {
        const cliente = await this.findByID(id);
        return await cliente.destroy(cliente);
    }
}