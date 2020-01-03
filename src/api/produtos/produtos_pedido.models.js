import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Produtos_Pedido extends Model {}

  Produtos_Pedido = sequelize.define(
    'produtos_pedido',
    {
      quantidade: dataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'produtos_pedido',
      tableName: 'produtos_pedido'
    },
  );

  return Produtos_Pedido;
};
