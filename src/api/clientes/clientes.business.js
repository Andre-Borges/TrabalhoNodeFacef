import ClientesDAO from './clientes.dao';
import * as Auth from './../utils/auth.utils';
import * as brUtils from '@brazilian-utils/validators';
import Boom from '@hapi/boom';

const clientesDAO = new ClientesDAO();

export default class ClientesBusiness {

  async list({ params }) {
    return clientesDAO.findAll(params);
  }

  async detail({ params }) {
    const { id } = params;

    return clientesDAO.findByID(id);
  }

  async create({ payload }) {
    const { email, numeroCpfCnpj } = payload;

    if (!brUtils.isValidCpf(numeroCpfCnpj) && !brUtils.isValidCnpj(numeroCpfCnpj))
      throw Boom.notAcceptable('Cpf ou Cnpj invalido!');

    const cpfCnpjExists = await clientesDAO.find({ numeroCpfCnpj });

    if (cpfCnpjExists)
      throw Boom.notAcceptable(
        'Cpf / Cnpj já está cadastrado! Utilize outro Cpf / Cnpj.',
      );

    const emailExists = await clientesDAO.find({ email });
    if (emailExists)
      throw Boom.notAcceptable(
        'Email já está cadastrado. Utilize outro Email.',
      );

    return clientesDAO.create(payload);
  }

  async update({ params, payload }) {
    const { id } = params;

    return clientesDAO.update(id, payload);
  }

  async destroy({ params }) {
    const { id } = params;

    return clientesDAO.destroy(id);
  }

  async login(params) {
    const { payload } = params;
    const cliente = await Auth.authenticate(payload);
    const token = Auth.getToken({
      id: cliente.id,
      email: cliente.email,
    });

    return { cliente, token };
  }
}
