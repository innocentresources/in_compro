import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
      console.log("🔥 AUTHORIZE HIT");
      console.log("EMAIL:", credentials?.email);
          
      if (!credentials?.email || !credentials?.password) {
        console.log("❌ Missing credentials");
        return null;
      }
    
      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      });
    
      console.log("USER FOUND:", !!user);
    
      if (!user) return null;
    
      const valid = await bcrypt.compare(
        credentials.password,
        user.passwordHash
      );
    
      console.log("PASSWORD VALID:", valid);
    
      if (!valid) return null;
    
      console.log("✅ AUTH SUCCESS");
    
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    }

    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

