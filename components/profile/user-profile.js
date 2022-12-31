import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ProfileForm from './profile-form'
import classes from './user-profile.module.css'

function UserProfile() {
  // Redirect away if NOT auth
  const { data: session, status } = useSession()
  const router = useRouter()

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    console.log(data)
  }

  useEffect(() => {
    if (status !== 'loading' && !session?.user) {
      router.push('/')
    }
  }, [status, session])

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  )
}

export default UserProfile
