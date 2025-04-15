import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./mongodb";
import bcrypt from "bcryptjs";
import User from "@/features/auth/models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password as string
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          firstName: user.name,
          role: user.role,
          image: user.image,
          isEmailVerified: user.emailVerified
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            const [firstName = "", ...lastNameParts] = (user.name || "").split(" ");
            const lastName = lastNameParts.join(" ");

            const newUser = await User.create({
              email: user.email,
              name: firstName,
              role: "TEACHER",
              password: await bcrypt.hash(Math.random().toString(36), 10),
              authProvider: "google",
              image: user.image,
              emailVerified: new Date(), // Google users are automatically verified
            });

            user.role = newUser.role;
            user.firstName = newUser.name;
            user.authProvider = "google";
            user.isEmailVerified = true;
          } else {
            user.role = existingUser.role;
            user.firstName = existingUser.name;
            user.authProvider = existingUser.authProvider;
            user.isEmailVerified = existingUser.emailVerified !== null;
            
            if (user.image && existingUser.authProvider === "google") {
              await User.findByIdAndUpdate(existingUser._id, {
                image: user.image
              });
            }
            user.image = existingUser.image || user.image;
          }
        } catch (error) {
          console.error("Error in signIn:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.email = user.email;
        token.image = user.image;
        token.isEmailVerified = user.isEmailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'TEACHER' | 'COORDINATOR' | 'ADMIN';
        session.user.firstName = token.firstName as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
};