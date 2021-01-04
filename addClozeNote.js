const { addNote } = require("./addNote");
const { createDeck } = require("./createDeck");
const { storePicture } = require("./storePicture");
const path = require("path");
const { parse } = require("node-html-parser");

const addClozeNote = async (textContent = "", extraContent = "") => {
  const deckName = "Notes";
  const params = {
    note: {
      deckName: `${deckName}`,
      modelName: "Cloze",
      fields: {
        Text: `${textContent}`,
        Extra: `${extraContent}`,
      },
      options: {
        allowDuplicate: false,
        duplicateScope: "deck",
        duplicateScopeOptions: {
          deckName: `${deckName}`,
          checkChildren: false,
        },
      },
      tags: [], // ["tag1", "tag2", ...]
    },
  };
  console.log(JSON.stringify(params));
  return addNote(params);
};

const parseClozeNode = (text) => {
  // text is anki-cloze
  const textParse = parse(`${text}`);
  let textArea = textParse.querySelector(".cloze-text").innerHTML;
  let extra = textParse.querySelector(".extra").innerText;

  let clozeArray = textParse.querySelectorAll(".cloze-text span");

  clozeArray.forEach((clozeItem) => {
    const className = clozeItem.classNames;
    console.log(`class of span is ${className}`);
    textArea = textArea.replace(
      `<span class="${className}">`,
      `{{${className}::`
    );
    textArea = textArea.replace("</span>", "}}");
  });

  console.log(clozeArray.toString());

  // add images if they exist in cloze-text section
  if (textParse.querySelector(".cloze-text img")) {
    const pictureLoop = textParse.querySelectorAll(".cloze-text img");
    pictureLoop.forEach((picture) => {
      const url = picture.getAttribute("src");
      const filename = path.parse(url).base;
      storePicture(url);
      textArea += `<br><img src = '${filename}'>`;
    });
  }

  // add images if they exist in extra section
  if (textParse.querySelector(".extra img")) {
    const pictureLoop = textParse.querySelectorAll(".extra img");
    pictureLoop.forEach((picture) => {
      const url = picture.getAttribute("src");
      const filename = path.parse(url).base;
      storePicture(url);
      extra += `<br><img src = '${filename}'>`;
    });
  }
  console.log(`textArea is ${textArea}`);
  console.log(`extra is ${extra}`);
  return addClozeNote(textArea, extra);
};

// addBasicNote("front question", "back answer", ["test-tag"]);

module.exports = {
  parseClozeNode,
};
