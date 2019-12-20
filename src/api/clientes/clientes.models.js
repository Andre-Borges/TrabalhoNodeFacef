import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';
import * as brUtils from '@brazilian-utils/validators';
import Boom from '@hapi/boom';

export default (sequelize, dataTypes) => {
    class Cliente extends Model {};
    
    Cliente.init({
        nome: dataTypes.STRING,
        numeroCpfCnpj: {
            type: dataTypes.BIGINT,
            unique: true
        },
        email: {
            type: dataTypes.STRING,
            unique: true
        },
        senha: dataTypes.STRING
    }, { sequelize, modelName: 'cliente' });

    Cliente.addHook('beforeSave', async (cliente) => {

        if (!brUtils.isValidCpf(cliente.numeroCpfCnpj) && !brUtils.isValidCnpj(cliente.numeroCpfCnpj))
            throw Boom.notAcceptable('Cpf ou Cnpj invalido!');

        const hash = await Bcrypt.hash(cliente.senha, 10);
        cliente.senha = hash; 
    });

    return Cliente;
};
