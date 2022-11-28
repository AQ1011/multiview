import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = { 
    providers: [    
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
                }
            },
        })
    ],
    callbacks: {
    //     async signIn({ user, account, profile, email, credentials }) {
    //         return true
    //     },
    //     async redirect({ url, baseUrl }) {
    //         return baseUrl
    //     },
        async session({ session, user, token }) {
            session.access_token = token.access_token;
            return session
        },
        async jwt({ token, user, account }) {
            if (user) {
              token.id = user.id;
            }
            if (account) {
              token.access_token = account.access_token;
              token.id_token = account.id_token;
            }
            return token;
        },
    }
}
export default NextAuth(authOptions)