
import jwt from 'jsonwebtoken'
import { Private } from '@package/config'

export function isAdminToken( token?: string ) {
    try {
        const webtoken = jwt.verify( token || 'null', Private.Credentials.Jwt ) as { sub: string, iat: number }
        return webtoken.sub == '[ADMIN]'
    } catch {
        return false
    }
}

export function createAdminToken() {
    return jwt.sign( { sub: '[ADMIN]' }, Private.Credentials.Jwt )
}
