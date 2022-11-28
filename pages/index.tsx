import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import useAuthSession from '../hooks/useAuthSession'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useAuthSession()

  if (status === "loading") {
    return <></>
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          height: "250px",
          display: 'flex',
          flexDirection: "column"
        }}
      >
        {
          <>
            <span>Email : {session?.user.email}</span>
            <span>Name  : {session?.user.name}</span>
            <span>Role  : {session?.user.role}</span>
            <span>ID    : {session?.user.id}</span>
            <span>Avatar: <img width={32} height={32} style={{ borderRadius: "50%" }} src={session?.user.image} /></span>
            <button onClick={async () => {
              return signOut()
            }} >Logout</button>
          </>
        }
      </div>
    </div>
  )
}
