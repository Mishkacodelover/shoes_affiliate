import allShoesQueries from "./mysql_queries/allShoes_queries.js";

const dao = {};

dao.addAllShoes = async () => await allShoesQueries.addAllShoes();
dao.getAllShoes = async () => await allShoesQueries.getAllShoes();

dao.getAllShoesById = async (id) => await allShoesQueries.getAllShoesById(id);

export default dao;
