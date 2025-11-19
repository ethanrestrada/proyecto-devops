const ClienteModel = require("../models/cliente.model");

exports.getClientes = async (req, res) => {
  try {
    const clientes = await ClienteModel.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error al obtener los clientes",
    });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await ClienteModel.findByPk(id);
    if (!cliente) {
      return res.status(404).json({
        error: "Cliente no encontrado en la base de datos",
      });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error al obtener el cliente",
    });
  }
};

exports.getClienteByEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const cliente = await ClienteModel.findOne({
      where: {
        email: email,
      },
    });
    if (!cliente) {
      return res.status(404).json({
        error: "Cliente no encontrado en la base de datos",
      });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error al obtener el cliente",
    });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const { nombre, email, direccion_envio, estado } = req.body;
    const cliente = await ClienteModel.create({
      nombre,
      email,
      direccion_envio,
      estado,
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error al crear el cliente",
    });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await ClienteModel.findByPk(id);
    if (!cliente) {
      return res.status(404).json({
        error: "Cliente no encontrado en la base de datos",
      });
    }

    const { nombre, email, direccion_envio, estado } = req.body;
    if (nombre !== undefined) cliente.nombre = nombre;
    if (email !== undefined) cliente.email = email;
    if (direccion_envio !== undefined)
      cliente.direccion_envio = direccion_envio;
    if (estado !== undefined) cliente.estado = estado;

    await cliente.save();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error al actualizar el cliente",
    });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const id = req.params.id;
    const cliente = await ClienteModel.findByPk(id);
    if (!cliente) {
      return res.status(404).json({
        error: "Cliente no encontrado en la base de datos",
      });
    }

    await cliente.destroy();
    res.status(200).json({
      message: "Cliente eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Error al eliminar el cliente",
    });
  }
};
