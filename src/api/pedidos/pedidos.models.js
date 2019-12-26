import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';
import * as brUtils from '@brazilian-utils/validators';
import Boom from '@hapi/boom';

export default (sequelize, dataTypes) => {
  class Pedido extends Model {}

  Pedido.init(
    {
      cli_id: dataTypes.INTEGER,
      valor: {
        type: dataTypes.DECIMAL,
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
      through: 'produtos_pedido',
      as: 'produto',
      onDelete: 'CASCADE',
    });
  };

  return Pedido;
};
