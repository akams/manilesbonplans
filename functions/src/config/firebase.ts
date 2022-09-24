import * as admin from "firebase-admin";

admin.initializeApp({
  // credential: admin.credential.cert({
  //   privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
  //   projectId: functions.config().project.id,
  //   clientEmail: functions.config().client.email,
  // }),
  // databaseURL: "http://localhost:4000/firestore",
});

const db = admin.firestore();
export { admin, db };
