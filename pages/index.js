import Head from "next/head";
import Image from "next/image";
import { APP_CONSTANT } from "../components/constant/app_constant";
import Auth from "../components/main/Auth";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Auth name={APP_CONSTANT.login} redirect={APP_CONSTANT.signup} />
    </div>
  );
}
