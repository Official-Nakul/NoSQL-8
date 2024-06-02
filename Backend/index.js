const express = require("express");
const app = express();
const db = require("./db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/contact", require("./Routes/contactRoutes"));
app.use("/api/user", require("./Routes/userRoutes"));
app.listen(3000, () => {
  console.log("server started on port 3000");
});
