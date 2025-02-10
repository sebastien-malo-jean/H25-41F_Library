const admin = require("firebase-admin");
const { getfirestore } = require("firebase-admin/firestore");

const accessKey = require("../db-config.json");

admin.initializeApp({
  credential: admin.credential.cert(accessKey),
});

const db = getfirestore();

module.exports = db;
