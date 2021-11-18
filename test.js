const { request_handled, top100, clear } = require("./index.js");

(async function () {
  await request_handled("145.87.2.12");
  await request_handled("145.87.2.13");
  await request_handled("145.87.2.53");
  await request_handled("145.87.2.213");

  console.log(await top100());
})();
//top100()
//clear()
