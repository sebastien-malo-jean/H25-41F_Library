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
server.get("/", async (req, res) => {
  await res.json({ msg: "ici c'est la page d'index" });
});

server.get("/character", async (req, res) => {
  const characters = [];

  const docRefs = await db.collection("characters").get();

  docRefs.forEach((doc) => {
    const data = doc.data();
    const character = { id: doc.id, ...data };
    characters.push(character);
  });

  return res.status(200).json(characters);
});

server.get("/character/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = await db.collection("characters").doc(id).get();

    if (!docRef.exists) {
      return res.status(404).json({
        error: "L'identifiant du personnage n'est pas dans la base de donnée.",
      });
    }
    const character = { id: docRef.id, ...docRef.data() };
    return res.status(200).json({ character });
  } catch (error) {
    console.error("Erreur lors de la récupération du personnage :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST
server.post("/character", (req, res) => {
  return res.json({
    msg: "Ici, c'est la page pour la création d'un Personnage.",
  });
});

/**
 * Route pour la page pour initialiser la bdd.
 */
server.post("/character/dbinit", async (req, res) => {
  try {
    const characters = require("./data/library");

    //TODO: vérifier si le livre est déja dans la bdd.

    for (character of characters) {
      if (character.name) {
        const existingCharacter = await db
          .collection("characters")
          .where("name", "==", character.name)
          .get();

        if (existingCharacter.empty) {
          await db.collection("characters").add(character);
        } else {
          return res
            .status(200)
            .json({ msg: "Un ou plusieurs personnages existent déjà." });
        }
      }
    }
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
server.put("/character/:id", (req, res) => {
  return res.json({ msg: "Ici, c'est la page pour modifier un personnage." });
});

// DELETE
server.delete("/character/:id", (req, res) => {
  return res.json({
    msg: "Ici c'est la page pour supprimer un personnage de la bibliotheque.",
  });
});

// ressource 404
server.use((req, res) => {
  res.statusCode = 404;
  return res.json({ msg: "Ici, c'est la page d'erreur 404." });
});

server.listen(process.env.PORT, () => {
  console.log(`Le serveur est en écoute sur le port : ${process.env.PORT}`);
});
