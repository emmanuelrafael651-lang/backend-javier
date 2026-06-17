const Property = require("../models/Property");

// GET
exports.getProperties = async (req, res) => {
  try {
    if (!Property || typeof Property.find !== "function") {
      return res.status(500).json({
        error: "Modelo Property no está bien inicializado"
      });
    }

    const data = await Property.find();
    res.json(data);
  } catch (error) {
    console.error("GET properties error:", error);
    res.status(500).json({ error: error.message });
  }
};

// POST
exports.createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.json(newProperty);
  } catch (error) {
    console.error("CREATE property error:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE
exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Eliminada" });
  } catch (error) {
    console.error("DELETE property error:", error);
    res.status(500).json({ error: error.message });
  }
};