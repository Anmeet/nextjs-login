import classes from './starting-page.module.css'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function StartingPageContent() {
  // Show Link to Login page if NOT auth
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== 'loading' && !session?.user) {
      router.push('/auth')
    }
  }, [status, session])

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  )
}

export default StartingPageContent
