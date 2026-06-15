const Property = require("./Property");

// GET
exports.getProperties = async (req, res) => {
  const data = await Property.find();
  res.json(data);
};

// POST
exports.createProperty = async (req, res) => {
  const newProperty = await Property.create(req.body);
  res.json(newProperty);
};

// DELETE
exports.deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminada" });
};