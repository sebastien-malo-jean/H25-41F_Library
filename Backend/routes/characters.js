const express = require("express");
const routeur = express.Router();
const db = require("../config/db");
const { check, validationResult } = require("express-validator");

/**
 * Routes établie pour récuperer tous les personnages de la base de données.
 */
// GET

routeur.get(
  "/",
  [
    check("orderBy").escape().trim().optional().isLength({ max: 100 }),
    check("orderDirection").escape().trim().optional().isIn(["asc", "desc"]),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ msg: "données invalides" });
      }
      let {
        limit = 10,
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
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération du personnage." });
    }
  }
);

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
    return res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération du personnage." });
  }
});

// POST
routeur.post("/", async (req, res) => {
  try {
    const body = req.body;
    //   console.log(body);
    await db.collection("characters").add(body);
    const response = {
      msg: "le personnage à bien été ajouter à la bibliothèque.",
    };
    res.status(201).json(response);
  } catch (error) {
    console.error("Erreur lors de la création du personnage :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la création du personnage." });
  }
});

/**
 * Route pour la page pour initialiser la bdd.
 */
routeur.post("/dbinit", async (req, res) => {
  try {
    const characters = require("../data/library");

    //TODO: vérifier si le livre est déja dans la bdd.

    for (const character of characters) {
      if (character.name) {
        const existingCharacter = await db
          .collection("characters")
          .where("name", "==", character.name)
          .get();

        if (existingCharacter.empty) {
          await db.collection("characters").add(character);
        } else {
          return res
            .status(409)
            .json({ msg: "Un ou plusieurs personnages existent déjà." });
        }
      }
    }
    return res.status(201).json({
      msg: "base de donnée initialisé.",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Une erreur est survenue l'ors de l'initialisation de la base de donnée.",
    });
  }
});

// PUT
routeur.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await db.collection("characters").doc(id).update(body);
    const response = {
      msg: "le personnage à été modifié avec succès!",
      personnage: body,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Erreur lors de la modification du personnage :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la modification du personnage." });
  }
});

// DELETE
routeur.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("characters").doc(id).delete();
    const response = {
      msg: "Le personnage à bien été suprimé. ... :(",
      id: id,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Erreur lors de la supression du personnage :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la supression du personnage." });
  }
});

module.exports = routeur;
