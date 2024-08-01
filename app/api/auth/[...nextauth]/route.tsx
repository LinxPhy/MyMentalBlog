import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

console.log(process.env.GOOGLE_CLIENT_ID )

export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      })
  ],
  secret: process.env.NEXTAUTH_SECRET
}

// export default NextAuth(authOptions)

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

