const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Configuração do Sequelize

const Midia = sequelize.define(
  "Midia",
  {
    atletaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("foto", "video", "documento"),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "midias",
    timestamps: true,
  }
);

module.exports = Midia;
