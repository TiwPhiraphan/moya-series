
import { GoogleAuth } from 'google-auth-library'
import { Private } from '@package/config'

export const auth = new GoogleAuth({
    credentials: Private.Credentials.GoogleDrive,
    scopes: ['https://www.googleapis.com/auth/drive.file']
})
