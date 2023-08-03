import { currentDir } from "../index.js";
import dao from "../services/dao.js";

const __dirname = currentDir().__dirname;

const controller = {};

controller.uploadImage = async (req, res) => {
  try {
    if (req.files === null) return;
    console.log(req.files);
    if (!req.files) {
      return res.status(400).send("No se ha cargado ningún archivo");
    }

    const images = !req.files.file.length ? [req.files.file] : req.files.file;

    for await (const image of images) {
      let uploadPath = __dirname + "/public/images/" + image.name;
      let BBDDPath = "images/" + image.name;
      await image.mv(uploadPath);
      await dao.addImage({
        allshoes_reference: req.query.allshoes_reference,
        photoname: image.name,
        path: BBDDPath,
      });
    }

    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getImage = async (req, res) => {
  try {
    const image = await dao.getImageById(req.params.id);

    if (image.length <= 0) return res.status(404).send("La imagen no existe");

    return res.sendFile(image[0].path, { root: __dirname });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getAllShoesPhotos = async (req, res) => {
  try {
    const photos = await dao.getAllShoesPhotos();
    if (photos.length <= 0) return res.status(404).send("No existen fotos");
    return res.send(photos);
  } catch (e) {
    console.log(e.message);
  }
};

controller.getAllShoesSinglePhoto = async (req, res) => {
  try {
    const photo = await dao.getAllShoesByReference(req.params.reference);
    if (photo.length <= 0) return res.status(404).send("No existe la foto");
    [photo.reference] = photo;

    const photoSingle = await dao.getAllShoesSinglePhoto(photo[0].reference);

    return res.send(photoSingle[0]);
  } catch (e) {
    console.log(e.message);
  }
};

export default controller;
