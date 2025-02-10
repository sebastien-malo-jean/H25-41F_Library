// importation des librairies
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { log } = require("console");

const server = express();
dotenv.config();

//permission d'acces aux dossiers
const publicFile = path.join(__dirname, "public");

const { Library_BernWerb } = require(path.join(
  publicFile,
  "asset",
  "data",
  "library.js"
));

server.use(express.static(publicFile));

// fonction middleWare
function auth(req, res, next) {
  console.log("Authentification en cours...");
  next();
}

/**
 * Routes établie pour récuperer tous les livres de la base de données.
 */
// GET
server.get("/", (req, res) => {
  const answer = {
    msg: "Ici, c'est la page d'index de l'API.",
  };
  return res.json(express.response);
});

server.get("/books", (req, res) => {
  return res.json(Library_BernWerb);
});
// POST
server.post("/books", (req, res) => {
  return res.json({ msg: "Ici, c'est la page pour la création d'un livre." });
});

server.post("/books/initialisation", (req, res) => {
  return res.json({
    msg: "Je ne sais pas a quoi sert la page d'initialisation page. mais elle est là.",
  });
});
// PUT
server.put("/books/:id", (req, res) => {
  return res.json({ msg: "Ici, c'est la page pour modifier un livre." });
});
// DELETE
server.delete("/books/:id", (req, res) => {
  return res.json({
    msg: "Ici c'est la page pour supprimer un livre de la bibliotheque.",
  });
});
// ressource 404
server.use((req, res) => {
  res.statusCode = 404;
  return res.json({ msg: "Ici, c'est la page d'erreur 404." });
});

server.listen(process.env.PORT, () => {
  console.log(`Le serveur est en écoute sur le port ${process.env.PORT}`);
});
