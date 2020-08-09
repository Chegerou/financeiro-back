import Sequelize, { Model } from 'sequelize';

class Receipt extends Model {
  static init(sequelize) {
    super.init(
      {
        path: Sequelize.STRING,
        valor: Sequelize.INTEGER,
        data_de_pagamento: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associar(models) {
    this.belongsTo(models.User, { foreignKey: 'id_usuario' });
  }
}

export default Receipt;
