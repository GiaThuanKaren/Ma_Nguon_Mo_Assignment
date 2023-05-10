import "../styles/globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import type { AppProps } from "next/app";
import React from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";
import useToken from "src/hook/useToken";
import { Updatetoken } from "src/service/api";
import { ShowToastify } from "src/utils";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

  const router = useRouter();
  const { tokenFCM } = useToken()
  React.useEffect(() => {
    async function FetchApi() {
      try {

      } catch (error) {
        console.log(error)
        // ShowToastify("ERROR")
      }
    }
    if (tokenFCM?.tokenFCM) {
      // FetchApi();
    }
  }, [tokenFCM?.tokenFCM])
  console.log("TOKEN in Here", tokenFCM);
  React.useEffect(() => {
    async function Fetch() {
      const session = await getSession();

      if (session?.user) {
        console.log(session, "USER AFTER LOGIN INNNNNNNNNN");
        const usersession: any = session?.user
        localStorage.setItem("user", JSON.stringify(usersession?.id))
      } else {
        router.push("/signin")
      }

    }
    Fetch()
  }, [])


  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastContainer autoClose={800} />
      </SessionProvider>
    </>
  );
}
