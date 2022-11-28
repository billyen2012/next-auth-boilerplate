import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export default function useAuthSession() {
  const router = useRouter();

  return useSession({
    required: true,
    async onUnauthenticated() {
      return router.push("/login");
    },
  });
}
