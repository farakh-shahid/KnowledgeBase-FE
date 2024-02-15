import { useContext, useEffect, useState } from "react";
import { readUserFromToken } from "@/utils/tokens";
import { UserProps } from "@/interfaces/userProps";
import { useRouter } from "next/router";
import { StoreContext, StoreContextState } from "@/contextStore/storeProvider";

export default function RouteGuard({ children }: any) {
  const store = useContext<StoreContextState>(StoreContext);
  const [, setUser] = store.user;
  const [, setAuthorized] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    authorization();
    
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    
    router.events.on('routeChangeComplete', authorization)
    
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authorization);
    }
  }, [])
  
  const authorization = () => {
    const user: UserProps | null = readUserFromToken();
    const userExists = !!user?.id;
    if (!userExists) {
      router.push('/login');
    } else {
      setUser(user)
    }
  }

  return (children);
}
