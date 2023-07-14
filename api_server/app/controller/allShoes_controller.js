import dao from "../services/dao.js";

const controller = {};

controller.addAllShoes = async (req, res) => {
  const {
    collectionName,
    collectionType,
    initialDate,
    finishDate,
    userCreated,
  } = req.body;

  console.log(req.body);

  if (!collectionName || !collectionType || !initialDate || !finishDate)
    return res.status(400).send("Error al recibir el body");

  try {
    const collection = await dao.getCollectionByName(collectionName);

    if (collection.length > 0)
      return res.status(409).send("esta colección ya existe");

    await dao.addCollection(req.body);
    const addCollection = await dao.getCollectionByUserId(userCreated);

    if (addCollection) return res.send(addCollection);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getAllShoesById = async (req, res) => {
  try {
    const collection = await dao.getCollectionById(req.params.id);

    if (collection.length <= 0)
      return res.status(404).send("La colección no existe");

    return res.send(collection[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getAllShoes = async (req, res) => {
  try {
    const collections = await dao.getAllCollections(req.params.id);

    if (collections.length <= 0)
      return res.status(404).send("No existen colecciones");

    return res.send(collections);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

export default controller;
