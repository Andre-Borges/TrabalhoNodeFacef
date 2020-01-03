import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Pedido extends Model {}

  Pedido.init(
    {
      valor: {
        type: dataTypes.DECIMAL,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['clienteId'],
        },
      },
      sequelize,
      modelName: 'pedido',
    },
  );

  Pedido.associate = models => {
    models.pedido.belongsTo(models.cliente, {
      as: 'cliente',
      foreignKey: 'clienteId',
    });
    models.pedido.belongsToMany(models.produto, {
      foreignKey: 'pedidoId',
      through: models.produtos_pedido,
      as: 'produtos',
      onDelete: 'CASCADE',
    });
  };

  return Pedido;
};
