import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'

import { verifyPassword } from '../../../lib/auth'
import { connectToDatabase } from '../../../lib/db'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const client = await connectToDatabase()
        const { email, password } = credentials

        if (!email || !password) {
          throw new Error('Invalid credentials')
        }

        const db = client.db()
        let user = await db.collection('users').findOne({ email })
        if (!user) {
          throw new Error('Invalid credentials')
        }

        const isValid = await verifyPassword(password, user.password)

        if (!isValid) {
          throw new Error('invalid password')
        }

        client.close()
        return { email: email }
      },
    }),
  ],
})
