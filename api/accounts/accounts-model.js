const db = require("../../data/db-config");
/**
 * @param {import("knex").Knex} db
 * @returns {promise<void> }
 */

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};
const getByName = (name) => {
  return db("accounts").where("name", name).first();
};

const create = async (account) => {
  const id = db("accounts").insert(account);
  return await getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return await getById(id);
};

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
};
