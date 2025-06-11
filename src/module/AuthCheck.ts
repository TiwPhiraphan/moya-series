
import { Private } from "@package/config"
import jwt from "jsonwebtoken"


export function verifyToken( token?: string ) {
    try {
        const webtoken = jwt.verify( token || 'null', Private.Credentials.Jwt ) as { accept: string, iat: number }
        return webtoken.accept == 'role=[ADMIN]'
    } catch {
        return false
    }
}