import { currentDir } from "../index.js";
import dao from "../services/dao.js";

const __dirname = currentDir().__dirname;

const controller = {};

controller.uploadImage = async (req, res) => {
  try {
    if (req.files === null) return;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningún archivo");
    }

    if (!req.query) return res.status(400).send("Sin id del zapato");
    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;

    images.forEach(async (image) => {
      let uploadPath = __dirname + "/app/public/images/" + photo.name;
      let BBDDPath = "images/" + photo.name;
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.addImage({
        photoname: photo.name,
        path: BBDDPath,
        allshoes: req.query.id,
      });
    });

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

controller.getAllShoesSintlePhoto = async (req, res) => {
  try {
    const photo = await dao.getAllShoesById(req.params.id);
    if (photo.length <= 0) return res.status(404).send("No existe la foto");
    [photo.id] = photo;

    const photoSingle = await dao.getAllShoesSinglePhoto(photo[0].id);

    return res.send(photoSingle[0]);
  } catch (e) {
    console.log(e.message);
  }
};

export default controller;
