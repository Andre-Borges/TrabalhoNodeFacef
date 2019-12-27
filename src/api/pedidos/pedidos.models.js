import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';
import * as brUtils from '@brazilian-utils/validators';
import Boom from '@hapi/boom';

export default (sequelize, dataTypes) => {
  class Pedido extends Model {}

  Pedido.init(
    {
      valor: {
        type: dataTypes.DECIMAL,
      },
    },
    { sequelize, modelName: 'pedido' },
  );

  Pedido.associate = models => {
    models.pedido.belongsTo(models.cliente, {
      as: 'cliente',
      foreignKey: 'cliente_id',
    });
    models.pedido.belongsToMany(models.produto, {
      foreignKey: 'pedido_id',
      through: 'produtos_pedido',
      as: 'produto',
      onDelete: 'CASCADE',
    });
  };

  return Pedido;
};
