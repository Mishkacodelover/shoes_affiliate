import db from "../mysql.js";

const allShoesQueries = {};

allShoesQueries.addAllShoes = async (data) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let obj = {
      brand: data.brand,
      reference: data.reference,
      description: data.description,
      link: data.link,
      color: data.color,
      isDeleted: data.isDeleted || false,
    };

    return await db.query("INSERT INTO allshoes SET ?", [obj], "insert", conn);
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
      "SELECT * FROM allshoes WHERE id = ?",
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

allShoesQueries.getAllShoesByReference = async (reference) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM allshoes WHERE reference = ?",
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

allShoesQueries.getAllShoes = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM allshoes where isDeleted = 0 ",
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

export default allShoesQueries;
