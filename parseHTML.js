const { parseBasicNode } = require("./addBasicNote");
const { parseClozeNode } = require("./addClozeNote");
// const { storePicture } = require("./storePicture");
const path = require("path");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
const fs = require("fs");
// const util = require("util");
const { parse } = require("node-html-parser");

function readFile(file) {
  //file is the location of your file
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        // console.log("error perhaps??");
        // console.log(err);
        reject(err);
      }
      // console.log("not an error");
      //   console.log(data); //Data has your text file data
      resolve(data);
    });
  });
}

parseHTML = async () => {
  const text = await readFile(`${fileToRead}`);
  const root = parse(`${text}`);
  // console.log(root.querySelector(".anki-basic").toString());

  // Search for Anki Basic cards
  const basicArray = root.querySelectorAll(".anki-basic");
  basicArray.forEach((item) => {
    parseBasicNode(item);
  });

  // // Search for Anki Basic Reversed cards
  // const basicRArray = root.querySelectorAll(".anki-basic-r");
  // basicRArray.forEach((item) => {
  //   parseBasicReverseNode(item);
  // });

  // Search for Cloze cards
  const clozeArray = root.querySelectorAll(".anki-cloze");
  clozeArray.forEach((clozeItem) => {
    parseClozeNode(clozeItem);
  });
};

const fileToRead = process.argv[2];

parseHTML();
