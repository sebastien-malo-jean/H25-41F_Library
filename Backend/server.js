// importation des librairies
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { log } = require("console");
const db = require("./config/db");
const server = express();
dotenv.config();

//permission d'acces aux dossiers
const publicFile = path.join(__dirname, "public");

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
server.get("/", async (req, res) => {});

server.get("/books", async (req, res) => {
  const books = [];

  const docRefs = await db.collection("books").get();

  docRefs.forEach((doc) => {
    const book = doc.data();
    books.push(book);
  });

  return res.json(books);
});
// POST
server.post("/books", (req, res) => {
  return res.json({ msg: "Ici, c'est la page pour la création d'un livre." });
});

server.post("/books/initialisation", (req, res) => {
  try {
    const books = require("./data/library");

    //TODO: vérifier si le livre est déja dans la bdd.

    books.forEach(async (book) => {
      await db.collection("books").add(book);
    });
    return res.status(201).json({
      msg: "base de donnée initialisé.",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Une erreur est survenue",
    });
  }
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
