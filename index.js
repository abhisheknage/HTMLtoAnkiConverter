// import { noteToBeAdded } from "./data";
const testData = require("./data.js");
const noteToBeAdded = testData.noteToBeAdded;
const { invoke } = require("./invoke");

// console.log(testData.noteToBeAdded);

async function asyncCall() {
  //   console.log("Entering the function");
  //   await invoke("createDeck", 6, { deck: "notes" });
  //   console.log("deck has been successfully created");
  // dont need the above as when creating the note, deck is already being inputted
  await invoke(
    noteToBeAdded.action,
    noteToBeAdded.version,
    noteToBeAdded.params
  );
  console.log("Hopefully a new note has been created??");
  //   const result = await invoke("deckNames", 6);
  //   console.log(`got list of decks: ${result}`);
}

asyncCall();
console.log("A call has been made");
