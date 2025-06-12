
import firebase from 'firebase-admin'
import { Private } from '@package/config'

const app = firebase.apps.length == 0 ? firebase.initializeApp({
    credential: firebase.credential.cert({
        projectId: Private.Credentials.Firebase.project_id,
        privateKey: Private.Credentials.Firebase.private_key,
        clientEmail: Private.Credentials.Firebase.client_email
    }),
    databaseURL: Private.Credentials.Firebase.databaseURL
}) : firebase.app()

export default app.database()
