import NextAuth, { type NextAuthConfig } from 'next-auth'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import credentials from 'next-auth/providers/credentials'
import prisma from './lib/prisma'

const authenticatedRoutes = ['/checkout', '/checkout/address', '/profile']

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthenticatedRoute = authenticatedRoutes.includes(
        nextUrl.pathname
      )
      if (isAuthenticatedRoute) {
        if (isLoggedIn) return true
        return false
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }

      return token
    },

    session({ session, token }) {
      session.user = token.data as any
      return session
    }
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        })

        if (!user) return null
        if (!bcryptjs.compareSync(password, user.password)) return null

        const { password: _, ...rest } = user // return all user info but password

        return rest
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
