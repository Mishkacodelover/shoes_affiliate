import allShoesQueries from "./mysql_queries/allShoes_queries.js";
import photosQueries from "./mysql_queries/photos_queries.js";

const dao = {};

dao.addAllShoes = async (data) => await allShoesQueries.addAllShoes(data);
dao.getAllShoes = async () => await allShoesQueries.getAllShoes();

dao.getAllShoesById = async (id) => await allShoesQueries.getAllShoesById(id);
dao.getAllShoesByReference = async (reference) =>
  await allShoesQueries.getAllShoesByReference(reference);

dao.addImage = async (imageData) => await photosQueries.addImage(imageData);

dao.getImageById = async (id) => await photosQueries.getImageById(id);

dao.getAllShoesPhotos = async () => await photosQueries.getAllShoesImages();

dao.getAllShoesSinglePhoto = async (shoe) =>
  await photosQueries.getAllShoesSingleImage(shoe);

export default dao;
