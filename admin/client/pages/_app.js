import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// import { useRouter } from "next/router";
// const { asPath } = useRouter();
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
