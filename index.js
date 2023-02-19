const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config.env" });

// Database connection
require("./database/index");

// backend PORT
const port = process.env.PORT || 9090;

app.listen(port, () => {
  console.log(`App is listening on ${port}...`);
});
