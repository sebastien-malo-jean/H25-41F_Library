const express = require("express");
const routeur = express.Router();
const db = require("../config/db");

/**
 * Routes établie pour récuperer tous les personnages de la base de données.
 */
// GET

routeur.get("/", async (req, res) => {
  try {
    let {
      limit = 3,
      start = 0,
      orderBy = "name",
      orderDirection = "asc",
    } = req.query;
    limit = Number(limit);
    start = Number(start);

    const characters = [];

    const docRefs = await db
      .collection("characters")
      .orderBy(orderBy, orderDirection)
      .offset(start)
      .limit(limit)
      .get();

    docRefs.forEach((doc) => {
      const data = doc.data();
      const character = { id: doc.id, ...data };
      characters.push(character);
    });

    return res.status(200).json(characters);
  } catch (error) {
    console.error("Erreur lors de la récupération du personnage :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

routeur.get("/:id", async (req, res) => {
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
routeur.post("/", (req, res) => {
  return res.json({
    msg: "Ici, c'est la page pour la création d'un Personnage.",
  });
});

/**
 * Route pour la page pour initialiser la bdd.
 */
routeur.post("/dbinit", async (req, res) => {
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
routeur.put("/:id", (req, res) => {
  return res.json({ msg: "Ici, c'est la page pour modifier un personnage." });
});

// DELETE
routeur.delete("/:id", (req, res) => {
  return res.json({
    msg: "Ici c'est la page pour supprimer un personnage de la bibliotheque.",
  });
});

module.exports = routeur;
