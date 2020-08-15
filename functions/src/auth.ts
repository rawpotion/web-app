import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
  projectId: 'rawpotion-64d41',
  credential: admin.credential.applicationDefault(),
  databaseURL: 'localhost:4301',
});

const db = admin.firestore();

export const createUserRecord = functions.auth
  .user()
  .onCreate((user, context) => {
    const userRef = db.doc(`users/${user.uid}`);

    return userRef.set({
      name: user.displayName,
      email: user.email,
      createdAt: context.timestamp,
    });
  });
