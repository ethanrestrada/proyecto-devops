const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Cliente = db.define(
  "Cliente",
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false,
    },
    direccion_envio: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "clientes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Cliente;
