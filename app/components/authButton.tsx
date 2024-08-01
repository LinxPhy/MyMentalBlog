import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {

    const { data: session } = useSession()

    if (session) {
        return (
            <>
                Signed in <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button className='buttonStyle1' onClick={() => signIn()}>Login</button>
        </>
    )
}