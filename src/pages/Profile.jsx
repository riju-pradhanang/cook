import { useAuth } from '../context/AuthContext'

export default function Profile(){
  const { user } = useAuth()
  if (!user) return null
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500">Name</div>
        <div className="font-medium">{user.name}</div>
      </div>
      <div className="rounded-lg border p-4">
        <div className="text-sm text-gray-500">Email</div>
        <div className="font-medium">{user.email}</div>
      </div>
    </div>
  )
}
