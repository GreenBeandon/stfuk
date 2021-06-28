require("dotenv").config();
var debug = process.env.DEBUG === "true";
exports.log = (text) => {
  if(debug){
    console.log(text);
  }
}
