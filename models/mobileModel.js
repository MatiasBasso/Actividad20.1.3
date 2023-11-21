const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "matibasso",
    database: "Mobile",
    connectionLimit: 5,
  });

  const getUsers = async () => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT id, brand, model, price, currency FROM mobile_price",
      );
  
      return rows;
    } catch (error) {

    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };

  const getUserById = async (id) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT id, brand, model, price, currency FROM mobile_price WHERE id=?",
        [id]
      );
  
      return rows[0];
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };

  const createUser = async (user) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(
        `INSERT INTO mobile_price(brand, model, price, currency) VALUE(?, ?, ?, ?)`,
        [user.brand, user.model, user.price, user.currency]
      );
  
      return { id: parseInt(response.insertId), ...user };
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  const updateUser = async (id, user) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        `UPDATE mobile_price SET brand=?, model=?, price=?, currency=? WHERE id=?`,
        [user.brand, user.model, user.price, user.currency, id]
      );
  
      return { id, ...user };
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  const deleteUser = async (id) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE FROM mobile_price WHERE id=?", [id]);
  
      return true;
    } catch (error) {
      console.log(error);
    } finally {
      if (conn) conn.release(); //release to pool
    }
    return false;
  };
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
  