import getUserProfile from "@/libs/getUserProfile";
import userLogIn from "@/libs/userLogIn";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        // Provider type
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // Pass HTML attributes to the <input> tag through this object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here
                
                if (!credentials) return null
                const user = await userLogIn(credentials.email, credentials.password);
                const userData = (await getUserProfile(user.token)).data;
                user._id = userData._id
                user.name = userData.name
                user.email = userData.email

                if (user) {
                    // Included in JWT token
                    return user
                } else {
                    // An error will be displayed.
                    return null
        
                    // You can also throw an Error and the send the user to the error page
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
        },
        async session({session, token, user}) {
            session.user = token as any;
            return session;
        },
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }