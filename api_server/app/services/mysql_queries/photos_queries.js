import db from "../mysql.js";

const photosQueries = {};

photosQueries.addImage = async (imageData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let imageObj = {
      allshoes_reference: imageData.allshoes_reference,
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
      "SELECT allshoes.id as shoesId, allshoes.brand,allshoes.reference,allshoes.description,allshoes.link,allshoes.color,photos.id as photoId,photos.allshoes_reference,photos.photoname,photos.path FROM shoes.allshoes JOIN shoes.photos on allshoes.reference= photos.allshoes_reference",
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

photosQueries.getAllShoesSingleImage = async (reference) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT allshoes.id as shoesId, allshoes.brand,allshoes.reference,allshoes.description,allshoes.link,allshoes.color,photos.id as photoId,photos.allshoes_reference,photos.photoname,photos.path FROM shoes.allshoes JOIN shoes.photos on allshoes.reference= photos.allshoes_reference where allshoes_reference = ? ",
      reference,
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
