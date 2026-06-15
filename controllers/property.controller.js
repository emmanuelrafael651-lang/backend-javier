const Property = require("../models/Property");

// OBTENER
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREAR
const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR
const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Propiedad eliminada",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProperties,
  createProperty,
  deleteProperty,
};