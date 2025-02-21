// Importation des librairies
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Initialisation
dotenv.config();
const server = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON et le x-www-form-urlencoded
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes
server.use("/characters", require("./routes/characters"));
server.use(express.static(path.join(__dirname, "public")));

// Page d'index
server.get("/", async (req, res) => {
  res.json({ msg: "Ici c'est la page d'index" });
});

// Inscription
server.post(
  "/users/inscription",
  [check("email").escape().trim().notEmpty().isEmail().normalizeEmail()],
  async (req, res) => {
    const erreurValidation = validationResult(req);
    if (!erreurValidation.isEmpty()) {
      return res.status(400).json({ msg: "Données invalides" });
    }

    const { email, password } = req.body;
    const userRefs = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    if (!userRefs.empty) {
      return res.status(400).json({ msg: "Utilisateur existant" });
    }

    const hash = await bcrypt.hash(password, 10);
    await db.collection("users").add({ email, password: hash });

    return res.status(201).json({ msg: "L'utilisateur a été créé" });
  }
);

// Connexion
server.post("/user/connection", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email et mot de passe requis" });
  }

  const userRefs = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  if (userRefs.empty) {
    return res.status(400).json({ msg: "Utilisateur non trouvé" });
  }

  const userData = userRefs.docs[0].data();
  const isMatch = await bcrypt.compare(password, userData.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Mot de passe incorrect" });
  }

  const token = jwt.sign(
    { id: userRefs.docs[0].id, email: userData.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res.json({ msg: "Connexion réussie", token });
});

// Ressource 404
server.use("*", (req, res) => {
  res
    .status(404)
    .json({ msg: "Erreur 404. Ce que vous cherchez n'existe pas." });
});

// Gestion des erreurs et fermeture propre
process.on("SIGTERM", () => {
  console.log("Fermeture du serveur...");
  server.close(() => {
    console.log("Serveur arrêté proprement");
    process.exit(0);
  });
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port : ${PORT}`);
});
