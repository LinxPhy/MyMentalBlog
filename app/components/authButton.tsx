import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {

    const { data: session } = useSession()

    if (session) {
        return (
            <button className='buttonStyle2' onClick={() => signOut()}>Sign out</button>
        )
    }
    return (
        <button className='buttonStyle1' onClick={() => signIn()}>Login</button>
    )
}