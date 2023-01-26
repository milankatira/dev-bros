import React from "react";
import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CookiesProvider } from "react-cookie";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../layouts/navbar"), {
  ssr: false,
});
import { ExamProvider } from "../context/context/Exam";
import { AuthProvider } from "../context/context/Auth";
import { LoadingProvider, useLoadingcontext } from "../context/context/Loading";
import Loading from "../components/common/design/Loading";
import { Toaster } from "react-hot-toast";
const progress = new ProgressBar({
  size: 4,
  color: "#A855F7",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", () => {
  progress.start();
});

Router.events.on("routeChangeComplete", () => {
  progress.finish();
});

Router.events.on("routeChangeError", () => {
  progress.finish();
});

function MyApp({ Component, pageProps }) {
  return (
  // <LoadingProvider>

    <>
      <Toaster />
      <AuthProvider>
        <ExamProvider>
          {/* <Loading /> */}
          <Navbar />
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </ExamProvider>
      </AuthProvider>
    </>

  // {/* </LoadingProvider> */}
  );
}

export default MyApp;
