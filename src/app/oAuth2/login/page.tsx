
import { verifyToken } from "@package/module/AuthCheck";
import Login from "@package/components/Login";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function LoginPage( ) {

    const cookie = await cookies()

    if ( verifyToken( cookie.get('Authorization')?.value ) ) {
        redirect('/dashboard')
    }

    return <Login />

}
