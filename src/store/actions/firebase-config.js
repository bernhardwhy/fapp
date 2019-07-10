import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCc8ATmOcecVW348BDadfzvtSpMUrvWjJs',
  authDomain: 'fapp-c83e2.firebaseio.com',
  databaseURL: 'https://fapp-c83e2.firebaseio.com/'
};

firebase.initializeApp(config);
const database = firebase.database();
console.log(database);
database.ref('/finishedWorkouts')
.orderByChild('finishedDate')
.limitToLast(2)
.once('value', snap => {
    const invite = snap.val();
    console.log(invite);
  });
export default database;