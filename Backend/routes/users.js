const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Validation des entrées
const validations = [
  check("name")
    .escape()
    .trim()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Le nom doit contenir au moins 5 caractères"),
  check("email").escape().trim().notEmpty().isEmail().normalizeEmail(),
  check("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères"),
];

// Inscription
router.post("/inscription", validations, async (req, res) => {
  try {
    const erreurValidation = validationResult(req);
    if (!erreurValidation.isEmpty()) {
      return res
        .status(400)
        .json({ msg: "Données invalides", erreurs: erreurValidation.array() });
    }

    const { name, email, password } = req.body;
    const userRefs = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!userRefs.empty) {
      return res.status(400).json({ msg: "Utilisateur existant" });
    }

    const hash = await bcrypt.hash(password, 10);
    const userRef = await db
      .collection("users")
      .add({ name, email, password: hash });

    return res
      .status(201)
      .json({ msg: "Utilisateur créé", userId: userRef.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
