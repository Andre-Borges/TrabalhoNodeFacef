import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';
import Sequelize from 'sequelize';

const op = Sequelize.Op;

export default class ProdutosDAO {
    model = instances.getModel('produto');

    async findAll(where) {
        if (where.descricao) {
            where.descricao = { [op.like]: `%${where.descricao}%`};
        }
        return this.model.findAll({ where, include: [ 'categoria' ] });
    }

    async findByID(id) {
        return await getObjectOr404(this.model, { where: { id }, include: [ 'categoria' ] });
    }

    async create(data) {
        const { id } = await this.model.create(data);
        return this.findByID(id);
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