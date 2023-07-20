import db from "../mysql.js";

const photosQueries = {};

photosQueries.addImage = async (imageData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let imageObj = {
      allshoes: imageData.allshoes,
      photoname: imageData.photoname,
      path: imageData.path,
      isDeleted: imageData.isDeleted || false,
    };

    return await db.query("INSERT INTO photos SET ?", imageObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

photosQueries.getImageById = async (id) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM photos WHERE id = ?",
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

photosQueries.getAllShoesImages = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT allshoes.id as shoesId, allshoes.reference,allshoes.description,allshoes.description,allshoes.link,photos.id as photoId,photos,photo.path FROM shoes.allshoes JOIN shoes.photos on allshoes.id= photos.id",
      [],
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

photosQueries.getAllShoesSingleImage = async (shoe) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT allshoes.id as shoesId, allshoes.reference,allshoes.description,allshoes.description,allshoes.link,photos.id as photoId,photos,photo.path FROM shoes.allshoes JOIN shoes.photos on allshoes.id= photos.id where allshoes.id = ? ",
      shoe,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

export default photosQueries;
