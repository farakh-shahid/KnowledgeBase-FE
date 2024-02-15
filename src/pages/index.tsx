import React, { useContext, useEffect } from "react";
import { StoreContext, StoreContextState } from "@/contextStore/storeProvider";
import { readUserFromToken } from "@/utils/tokens";
import { UserProps } from "@/interfaces/userProps";
import { useRouter } from "next/router";
import logo from "@/assets/icons/kb-logo.png";
import Image from "next/image";
import styles from '@/styles/loginForm.module.scss'

export default function Home() {

  const router = useRouter();
  const store = useContext<StoreContextState>(StoreContext);
  const [user] = store.user;
  const cleanUpTokens = store.cleanUpTokens;

  useEffect(() => {
    const activeUser: UserProps | null = readUserFromToken();
    const activeUserExists = !!activeUser?.id;
    if (!activeUserExists) {
      cleanUpTokens()
      router.push('/login');
    } else {
      router.push('/landing');
    }
  }, [user])

  return (
    <div className={styles.logo}>
      <Image src={logo} alt='Logo' width={300}></Image>
    </div>
  );
}


