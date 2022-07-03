import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-loading-skeleton/dist/skeleton.css";

import Link from "next/link";

import { useAuthcontext } from "../context/context/Auth";
import { UseEffectOnce } from "../hook/useEffectOnce";
const Header = () => {
  const { auth, Auth_api } = useAuthcontext();

  console.log(auth.authStatus?.user.role, "auth");
  const [navbar, setnavbar] = useState<boolean>(false);

  UseEffectOnce(() => {
    Auth_api.AuthStatus();
  });
  const changeBg = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 80) {
        setnavbar(true);
      } else {
        setnavbar(false);
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeBg);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeBg);
  }

  const [scrollDir, setScrollDir] = useState("scrolling down");

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <div
      className={
        navbar
          ? scrollDir == "scrolling up"
            ? "sticky top-0 z-50 bg-red-700 shadow-md"
            : "hidden top-0 z-50 bg-white shadow-md"
          : "sticky top-0 z-50 bg-white shadow-md"
      }
    >
      {auth.loading ? (
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 justify-center">
              <h1 className="w-10 h-10 rounded-full">
                <Skeleton circle className="w-10 h-10 rounded-full" />
              </h1>
              <div>
                <Skeleton width={100} className="ml-3 mt-2 text-xl" />
              </div>
            </a>

            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              <a className="mr-4 hover:text-gray-900">
                <Skeleton width={70} />
              </a>

              <a className="mr-4 hover:text-gray-900">
                <Skeleton width={70} />
              </a>

              <a className="mr-4 hover:text-gray-900">
                <Skeleton width={70} />
              </a>

              <a className="mr-4 hover:text-gray-900">
                <Skeleton width={70} />
              </a>
            </nav>
          </div>
        </header>
      ) : (
        <header className="text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">
                {auth.authStatus?.user?.firstName}
              </span>
            </a>

            {auth.authStatus?.user.role == "company" ? (
              <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <Link href="/company/profile">
                  <a className="mr-4 hover:text-gray-900">MyProfile</a>
                </Link>
                <Link href="/company/exam">
                  <a className="mr-4 hover:text-gray-900">My exam</a>
                </Link>
                <a className="mr-4 hover:text-gray-900">thirdlink</a>
                <a className="mr-4 hover:text-gray-900">Fourth Link</a>
              </nav>
            ) : (
              <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <Link href="/login">
                  <a className="mr-4 hover:text-gray-900">First Link</a>
                </Link>
                <Link href="/signup">
                  <a className="mr-4 hover:text-gray-900">Second Link</a>
                </Link>
                <a className="mr-4 hover:text-gray-900">thirdlink</a>
                <a className="mr-4 hover:text-gray-900">Fourth Link</a>
              </nav>
            )}
          </div>
        </header>
      )}
    </div>
  );
};

export default React.memo(Header);
