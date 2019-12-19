import { Model } from 'sequelize';
import Bcrypt from 'bcrypt';

export default (sequelize, dataTypes) => {
    class Cliente extends Model {};
    
    Cliente.init({
        nome: dataTypes.STRING,
        numeroCpfCnpj: dataTypes.DECIMAL,
        email: dataTypes.STRING,
        senha: dataTypes.STRING
    }, { sequelize, modelName: 'cliente' });

    Cliente.addHook('beforeCreate', async (cliente) => {

        // TODO: VALIDAR CPF E CNPJ unico, e email também

        const hash = await Bcrypt.hash(cliente.senha, 10);
        user.senha = hash; 
    });

    return Cliente;
};
