import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';
import * as brUtils from '@brazilian-utils/validators';
import Boom from '@hapi/boom';

export default (sequelize, dataTypes) => {
  class Pedido extends Model {}

  Pedido.init(
    {
      cliente: dataTypes.STRING,
      valor: {
        type: dataTypes.FLOAT,
      },
      produtos: {
        type: dataTypes.STRING,
      },
    },
    { sequelize, modelName: 'pedido' },
  );

  Pedido.associate = models => {
    models.pedido.belongsToMany(models.produto, {
      foreignKey: 'pedido_id',
      through: 'pedido_produtos',
      as: 'produto',
    });
  };

  return Pedido;
};
