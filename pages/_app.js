import "../styles/globals.css";
import Header from "../components/layouts/header/Header";
import Footer from "../components/layouts/footer/Footer";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
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
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
