
import google from '@googleapis/drive'
import { Private } from '@package/config';
import fs from 'fs';

const body = fs.createReadStream('./test/1749465647279.webp')

const auth = new google.auth.GoogleAuth({
    credentials: Private.Credentials.GoogleDrive,
    scopes: ['https://www.googleapis.com/auth/drive.file']
})

const drive = google.drive({ version: 'v3', auth });

// const files = await drive.files.list({
//     fields: 'nextPageToken, files(id, name, mimeType, createdTime)',
//     supportsAllDrives: true
// })
// console.log( files.data.files )

await drive.files.create({
    media: { body },
    requestBody: {
        name: Date.now().toString() + '.webp',
        parents: ['1GMQCzKONyarUvB4YvdWatlLs84dZoU9n']
    },
    fields: 'id,name'
}).then( console.log )
