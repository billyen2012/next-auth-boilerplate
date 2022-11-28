//@ts-nocheck
import type { GetServerSidePropsContext } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login({ providers }: { providers: Awaited<ReturnType<typeof getProviders>> }) {

  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session.status === "authenticated") router.push('/')
  }, [session])

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
          height: "250px"
        }}
      >
        {
          Object.keys(providers).map((key) => {
            switch (key) {
              case "google":
                return (
                  <div key={providers[key].name}>
                    <button onClick={() =>
                      signIn(providers[key].id)}
                    >
                      Sign in with {
                        providers[key].name
                      }
                    </button>
                  </div>
                )
              default:
                return `unknow OAuth provider '${key}'`
            }
          })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}