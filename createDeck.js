const { invoke } = require("./invoke");

const createDeck = async (deckName = "Notes") => {
  try {
    // console.log(`The deck name in createDeck is ${deckName}`);
    return await invoke("createDeck", 6, { deck: `${deckName}` });
  } catch (error) {
    console.log("Could not create deck");
    console.log(error);
  }
};

// createDeck("notes");

module.exports = { createDeck };
