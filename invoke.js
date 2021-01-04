var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function invoke(action, version, params = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    console.log("XMLHttp request object instantiated");
    xhr.addEventListener("error", () => reject("failed to issue request"));
    xhr.addEventListener("load", () => {
      try {
        const response = JSON.parse(xhr.responseText);
        if (Object.getOwnPropertyNames(response).length != 2) {
          throw "response has an unexpected number of fields";
        }
        if (!response.hasOwnProperty("error")) {
          throw "response is missing required error field";
        }
        if (!response.hasOwnProperty("result")) {
          throw "response is missing required result field";
        }
        if (response.error) {
          console.log("Error at response error");
          throw response.error;
        }
        resolve(response.result);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });

    xhr.open("POST", "http://127.0.0.1:8765");
    xhr.send(JSON.stringify({ action, version, params }));
  });
}

module.exports = {
  invoke,
};
