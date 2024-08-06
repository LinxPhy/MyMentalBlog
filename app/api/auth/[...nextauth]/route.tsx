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
    async signIn({ user }: any) {
      try {
        await axios.post(`${process.env.SERVER_URL}/storeUser`, {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        })
        console.log("success")
      } catch (err) {
        console.log(err)
      }


      return true
    },

    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      session.user.id = token.id;
      return session;
    },


  }
}


// export default NextAuth(authOptions)

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

