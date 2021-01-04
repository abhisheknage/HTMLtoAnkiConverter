const { addNote } = require("./addNote");
const { createDeck } = require("./createDeck");
const { storePicture } = require("./storePicture");
const path = require("path");
const { parse } = require("node-html-parser");

const addBasicNote = async (frontTextContent, backTextContent, tags = []) => {
  const deckName = "Notes";
  const params = {
    note: {
      deckName: `${deckName}`,
      modelName: "Basic",
      fields: {
        Front: `${frontTextContent}`,
        Back: `${backTextContent}`,
      },
      options: {
        allowDuplicate: false,
        duplicateScope: "deck",
        duplicateScopeOptions: {
          deckName: `${deckName}`,
          checkChildren: false,
        },
      },
      tags: tags, // ["tag1", "tag2", ...]
    },
  };
  console.log(JSON.stringify(params));
  return addNote(params);
};

const parseBasicNode = (text) => {
  // text is anki-basic
  const textParse = parse(`${text}`);
  let front = textParse.querySelector(".front").innerText;
  let back = textParse.querySelector(".back").innerText;

  if (textParse.querySelector(".front img")) {
    const pictureLoop = textParse.querySelectorAll(".front img");
    pictureLoop.forEach((picture) => {
      const url = picture.getAttribute("src");
      const filename = path.parse(url).base;
      storePicture(url);
      front += `<br><img src = '${filename}'>`;
    });
  }
  if (textParse.querySelector(".back img")) {
    const pictureLoop = textParse.querySelectorAll(".back img");
    pictureLoop.forEach((picture) => {
      const url = picture.getAttribute("src");
      const filename = path.parse(url).base;
      storePicture(url);
      back += `<br><img src = '${filename}'>`;
    });
  }
  return addBasicNote(front, back);
};

// addBasicNote("front question", "back answer", ["test-tag"]);

module.exports = {
  addBasicNote,
  parseBasicNode,
};
