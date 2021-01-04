const { invoke } = require("./invoke");
const path = require("path");

//

async function storePicture(url) {
  const filename = path.parse(url).base;
  // console.log(filename);
  const currentDir = __dirname;
  const params = {
    filename: filename,
    path: `${__dirname}/${url}`, // this has to be the absolute path
  };
  console.log(JSON.stringify(params));
  return invoke("storeMediaFile", 6, params);
}
// storePicture(["./assets/testimg.png"]);
module.exports = { storePicture };
