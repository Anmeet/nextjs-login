import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import AuthForm from '../components/auth/auth-form'

function AuthPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session && status !== 'loading') {
      router.push('/')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <h2>Loading...</h2>
  }
  return <AuthForm />
}

export default AuthPage
