// importation des librairies
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { log } = require("console");
const server = express();
const routeCharacter = require("./routes/characters");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// initialisation des variables d'environement
dotenv.config();

//Middleware pour 'parser' le JSON
server.use(express.json());
//Middleware pour parser les  requêtes POST aevc un body en x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

// -- Routes de points d'acces -- //
server.use("/characters", routeCharacter);
//permission d'acces aux dossiers publiques
const publicFile = path.join(__dirname, "public");
server.use(express.static(publicFile));

server.get("/", async (req, res) => {
  await res.json({ msg: "ici c'est la page d'index" });
});

server.post(
  "users/inscription",
  [check("email").escape().trim().notEmpty().isEmail().normalizeEmail()],
  async () => {
    //valdation des information

    // TODO
    const erreurValidation = validationResult(erq);

    if (!erreurValidation.isEmpty()) {
      return res.status(400).json({ msg: "Données invalidées" });
    }

    //recuperation des information du body avec identifiant unique, mot de passe
    const { email, password } = req.body;
    //verification des doublon
    const userRefs = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (userRefs.docs.length > 0) {
      return res.status(400).json({ msg: "utilisateur existant" });
    }
    //encryprtage du mot de passe
    const hash = await bcrypt.hash(password, 10);
    const user = { ...req.body, password: hash };
    //ajout de l'utilisateur à la db
    await db.collection("user").add(user);

    return res.status(201).json({ msg: "l'utilisateur à été créé" });
  }
);

server.post("user/connection", () => {
  //validation des données
  //récupéartion des information du body
  const { email, password } = req.body;
  //vérification du mdp

  //retour de l'authentification
});

// ressource 404
server.use((req, res) => {
  res.statusCode = 404;
  return res.json({ msg: "Erreur 404. ce que vous chercher n'existe pas." });
});

server.listen(process.env.PORT, () => {
  console.log(`Le serveur est en écoute sur le port : ${process.env.PORT}`);
});

// function auth(req, res, next) {
//   console.log("Authentification en cours...");
//   next();
// }
