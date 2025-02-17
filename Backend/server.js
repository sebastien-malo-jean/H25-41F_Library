// importation des librairies
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { log } = require("console");
const db = require("./config/db");
const server = express();
const routeCharacter = require("./routes/characters");
dotenv.config();

//permission d'acces aux dossiers
const publicFile = path.join(__dirname, "public");

server.use(express.static(publicFile));

// fonction middleWare
function auth(req, res, next) {
  console.log("Authentification en cours...");
  next();
}

server.get("/", async (req, res) => {
  await res.json({ msg: "ici c'est la page d'index" });
});

server.use("/character", routeCharacter);

// ressource 404
server.use((req, res) => {
  res.statusCode = 404;
  return res.json({ msg: "Ici, c'est la page d'erreur 404." });
});

server.listen(process.env.PORT, () => {
  console.log(`Le serveur est en écoute sur le port : ${process.env.PORT}`);
});
