const fs = require("fs");

exports.request_handled = function (ip_address) {
  return new Promise((resolve, reject) => {
    fs.readFile("all-ips.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let obj = JSON.parse(data); //get the object
        obj[ip_address] = obj[ip_address] ? obj[ip_address] + 1 : 1;

        let json = JSON.stringify(obj, null, 2); //convert it back to json
        fs.writeFile("all-ips.json", json, "utf8", (err2) => {
          if (err2) reject(err2);
          console.log("request_handled() complete");
          resolve();
        }); // append new content
      }
    });
  });
}

exports.top100 = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("all-ips.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let obj = JSON.parse(data); //get the object
        let ips = Object.keys(obj);
        if( ips.length == 0 ) resolve([]) // if there are no IPs by default return empty array

        let orderedList = [];
        orderedList[0] = ips[0]; // the biggest will be the first item by default
  
        for (let i = 1; i < ips.length; i++) {
          let flag = false; // a flag to determine if a splice was made
          for (let j = 0; j < orderedList.length; j++) {
            if (obj[ips[i]] > obj[orderedList[j]]) {
              orderedList.splice(j, 0, ips[i]);
              flag = true;
              break;
            }
          }
          if (!flag) {
            orderedList.push(ips[i]);
          }
        }
  
        resolve( orderedList.length <= 100 ? orderedList : orderedList.slice(0, 100))       
      }
    });
  }) 
}

exports.clear = function() {
  return new Promise((resolve, reject) => {
    //Cleaning all-ips.json
    fs.writeFile("all-ips.json", JSON.stringify({}, null, 2), "utf8", (err) => {
      if (err) reject(err);
      console.log("clear() complete");
      resolve()
    }); // write an empty object
  });
}
