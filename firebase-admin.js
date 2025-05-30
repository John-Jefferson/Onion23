// firebase-admin.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
module.exports = db;
db.collection("chatRooms")
        .doc("XAJ2fPT5MHr00T0bmmGO")
        .collection("messages")
        .add({
          text: "Hello",
          senderId: "user1",
          timestamp: Date.now()
        });