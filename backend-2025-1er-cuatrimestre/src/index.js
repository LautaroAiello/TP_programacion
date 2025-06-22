import app from "./app.js";
const jwt = require("jsonwebtoken");

const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};


main();
