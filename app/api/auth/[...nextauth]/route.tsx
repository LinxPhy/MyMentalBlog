import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser } : any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user } : any) {
      session.user.id = token.id;
      
      const data = {
        id: session?.user.id,
        name: session?.user.name,
        email: session?.user.email,
        image: session?.user.image,
        expiration: session?.expires
      }

      storeData(data)
      return session;
    }
  }
}

function storeData({data} : any){

}

// export default NextAuth(authOptions)

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

