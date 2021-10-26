const express = require("express");
const gameRoute = require("./routes/game");
const path = require("path");
const lifeLinesRoute = require("./routes/lifelines");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/`);
});

app.use(express.static(path.join(__dirname, "public")));

gameRoute(app);
