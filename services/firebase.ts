import admin from 'firebase-admin';
const serviceAccount = require("./aplicativotcc-d8aa4-firebase-adminsdk-wocti-5980ea7cc0.json");

admin.initializeApp({    
    credential: admin.credential.cert(Object(serviceAccount)),
    databaseURL: "https://aplicativotcc-d8aa4.firebaseio.com"
});

export default admin;