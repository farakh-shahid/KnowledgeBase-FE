import SignUpForm from "@/containers/templates/Signup/signup";
import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import { decodeHash } from "@/services/api/inviteService";
import { AxiosError } from "axios";
import { checkUser } from "@/services/api/userService";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();
  const [hashed, setHashed] = useState("");
  useEffect(() => {
    const getHash = async () => {
      if (router.isReady) {
        const hash = router.query.hash;
        try {
          const res = await decodeHash(hash as string);
          setHashed(res.data);
          const isUser = await checkUser(res.data);
          if (isUser.data) {
            toast.info(
              "User already registerd through this link. Login to proceed"
            );
            router.replace("/login");
          }
        } catch (error) {
          const err = error as AxiosError;
          if (err?.response?.status === 500) {
            router.replace("/forbidden");
          }
        }
      }
    };
    getHash();
  }, [router]);
  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <SignUpForm hashed={hashed} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default SignUp;
