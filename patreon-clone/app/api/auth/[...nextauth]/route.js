import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectdb from '@/db/connectdb'

export const authoptions = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: "read:user user:email", // Important!
                },
            },
        }),

    ],
    callbacks: {
        async signIn({ user, account, profile, email }) {
            const userEmail = email || profile?.email;
            await connectdb()
            if (account.provider === 'github') {
                if (!userEmail) {
                    console.error("No email found in GitHub profile");
                    return false;
                }

                let existingUser = await User.findOne({ email: userEmail });

                if (!existingUser) {
                    const username = userEmail.split('@')[0];
                    const displayName = profile.name || username;

                    const newUser = await User.create({
                        email: userEmail,
                        username: username,
                        name: displayName,
                    });

                    user.name = newUser.username;
                } else {
                    user.name = existingUser.username;
                }
            }
            return true;
        },
    }
})


export { authoptions as GET, authoptions as POST }
