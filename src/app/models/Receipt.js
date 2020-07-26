import Sequelize, { Model } from 'sequelize';

class Receipt extends Model {
  static init(sequelize) {
    super.init(
      {
        path: Sequelize.STRING,
        valor: Sequelize.INTEGER,
        data_de_pagamento: Sequelize.DATE,
        id_usuario: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Receipt;
