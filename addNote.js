const { invoke } = require("./invoke");
const { createDeck } = require("./createDeck");

const addNote = async (params) => {
  // Create Deck if not already created
  await createDeck();

  return await invoke("addNote", 6, params);
};

module.exports = { addNote };
