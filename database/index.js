const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("DATABASE connected successfully ✅");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection failed with error: ${err}`);
});
