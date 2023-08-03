import dao from "../services/dao.js";

const controller = {};

controller.addAllShoes = async (req, res) => {
  const { brand, reference, description, color } = req.body;

  console.log(req.body);

  if (!brand || !reference || !description || !color)
    return res.status(400).send("Error al recibir el body");

  try {
    const shoes = await dao.getAllShoesByReference(reference);

    if (shoes.length > 0)
      return res.status(409).send("esta referencia ya existe");

    await dao.addAllShoes(req.body);
    const addAllShoes = await dao.getAllShoesByReference(reference);

    if (addAllShoes) return res.send(addAllShoes);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getAllShoesById = async (req, res) => {
  try {
    const collection = await dao.getAllShoesById(req.params.id);

    if (collection.length <= 0)
      return res.status(404).send("El zapato  no existe");

    return res.send(collection[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getAllShoes = async (req, res) => {
  try {
    const collections = await dao.getAllShoes();

    if (collections.length <= 0)
      return res.status(404).send("No existen zapatos");

    return res.send(collections);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

export default controller;
