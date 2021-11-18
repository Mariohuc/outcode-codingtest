const fs = require("fs");

function request_handled(ip_address) {
  fs.readFile("all-ips.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data); //get the object
      obj[ip_address] = obj[ip_address] ? obj[ip_address] + 1 : 1;

      let json = JSON.stringify(obj, null, 2); //convert it back to json
      fs.writeFile("all-ips.json", json, "utf8", (err) => {
        if (err) throw err;
        console.log("request_handled() complete");
      }); // append new content
    }
  });
}

function top100(){
  console.log("Nothing")
}

function clear(){
  //Cleaning all-ips.json
  fs.writeFile("all-ips.json", JSON.stringify({}, null, 2), "utf8", (err) => {
    if (err) throw err;
    console.log("clear() complete");
  });// write an empty object
}

//request_handled("145.87.2.105");

clear()