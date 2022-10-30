import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "next-themes";

import Link from "next/link";

import { useAuthcontext } from "../context/context/Auth";
import { UseEffectOnce } from "../hook/useEffectOnce";
import { server_url } from "../config/app_config";
const Header = () => {
  const { theme, setTheme } = useTheme();
  const { auth, Auth_api } = useAuthcontext();
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
            ? "sticky top-0 z-50 shadow-2xl bg-white"
            : "hidden top-0 z-50"
          : "sticky top-0 z-50 bg-white"
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
            {auth?.authStatus?.pic ? (
              <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <img
                  className="w-10 h-10 rounded-full"
                  src={`${server_url}/${auth?.authStatus?.pic}`}
                  alt="profile"
                />
                <span className="ml-3 text-xl">
                  {auth.authStatus?.user?.firstName}
                </span>
              </a>
            ) : (
              <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10 text-white dark:text-black p-2 bg-blue-500 rounded-full"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-3 text-xl">devbros</span>
              </a>
            )}

            {auth.authStatus?.user.role == "company" ? (
              <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <Link href="/company/profile">
                  <a className="mr-4 hover:text-gray-900">MyProfile</a>
                </Link>
                <Link href="/company/exam">
                  <a className="mr-4 hover:text-gray-900">My exam</a>
                </Link>
                <Link href="/company/assignExam">
                  <a className="mr-4 hover:text-gray-900">assign exam</a>
                </Link>
                <Link href="/company/group-list">
                  <a className="mr-4 hover:text-gray-900">GroupList</a>
                </Link>
              </nav>
            ) : auth.authStatus?.user.role == "candidate" ? (
              <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                <Link href="/myprofile">
                  <a className="mr-4 hover:text-gray-900">Myprofile</a>
                </Link>
                <Link href="/listjob">
                  <a className="mr-4 hover:text-gray-900">List job</a>
                </Link>
                <Link href="/myexam">
                  <a className="mr-4 hover:text-gray-900">My exam</a>
                </Link>
                <a className="mr-4 hover:text-gray-900">Logout</a>
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

                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <svg
                      className="h-4 w-4 mr-4  fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 text-black mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
                    </svg>
                  )}
                </button>
              </nav>
            )}
          </div>
        </header>
      )}
    </div>
  );
};

export default React.memo(Header);
