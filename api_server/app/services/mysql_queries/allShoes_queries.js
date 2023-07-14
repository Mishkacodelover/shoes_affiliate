import db from "../mysql.js";

const allShoesQueries = {};

allShoesQueries.addAllShoes = async (collectionData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let collectionObj = {
      collectionName: collectionData.collectionName,
      collectionType: collectionData.collectionType,
      initialDate: collectionData.initialDate,
      finishDate: collectionData.finishDate,
      userCreated: collectionData.userCreated,
    };

    return await db.query(
      "INSERT INTO collection SET ?",
      [collectionObj],
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

allShoesQueries.getAllShoesById = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM collection WHERE id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

allShoesQueries.getAllShoes = async (userId) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM collection where userCreated = ? and isDelete = 0 ",
      userId,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default allShoesQueries;
