import { auth } from '@/auth.config'
import { Title } from '@/components'

export default async function ProfilePage() {
  const session = await auth()

  return (
    <div>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session!.user, null, 2)}</pre>
      <h3 className="text-3xl mb-10">{session!.user.name}</h3>
    </div>
  )
}
