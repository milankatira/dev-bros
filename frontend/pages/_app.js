import React from 'react'
import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";
import Navbar from "../layouts/navbar";
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
    <>
      <Toaster position="top-center" reverseOrder={false} />
        <Navbar/>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
}

export default MyApp;
