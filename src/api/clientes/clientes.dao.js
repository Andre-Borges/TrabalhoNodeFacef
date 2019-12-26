import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';
import Boom from '@hapi/boom';

export default class ClientesDAO {
  model = instances.getModel('cliente');

  async findAll(where) {
    return this.model.findAll({ where });
  }

  async findByID(id) {
    return await getObjectOr404(this.model, { where: { id } });
  }

  async create(data) {
    const { email, numeroCpfCnpj } = data;

    const cpfCnpjExists = await this.model.findOne({
      where: { numeroCpfCnpj },
    });
    if (cpfCnpjExists)
      throw Boom.notAcceptable(
        'Já existe um cliente com esse Cpf / Cnpj cadastrado. Por favor cadastre um Cpf / Cnpj diferente.',
      );

    const emailExists = await this.model.findOne({
      where: { email },
    });
    if (emailExists)
      throw Boom.notAcceptable(
        'Já existe um cliente com esse Email cadastrado. Por favor cadastre um Email diferente.',
      );

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
