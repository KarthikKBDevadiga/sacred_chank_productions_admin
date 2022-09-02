import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  CloseIcon,
  SearchIcon,
  BellIcon,
  MenuIcon,
  ActorIcon,
  MovieIcon,
  SettingIcon,
  PersonIcon,
} from "../icons/all";
import classNames from "../helpers/classNames";
import Footer from "./Footer";
import Metatag from "./Metatag";

import localforage from "localforage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import setCookie from "../helpers/setCookie";
import { useRouter } from "next/router";

import LoadingDialog from "../components/dialog/LoadingDialog";
import Link from "next/link";

const navigation = [
  { id: "home", name: "Home", href: "/", icon: HomeIcon, current: true },
  {
    id: "movies",
    name: "Movies",
    href: "/movies",
    icon: MovieIcon,
    current: false,
  },
  {
    id: "actors",
    name: "Actors",
    href: "/actors",
    icon: ActorIcon,
    current: false,
  },
];
const secondaryNavigation = [
  { name: "Settings", href: "#", icon: SettingIcon },
];

const PageFrame = ({
  children,
  page,
  title,
  dialogs,
  tokenExpired,
  user,
  loadingDialog,
  setLoadingDialog,
}) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setCookie("token", u.accessToken);
        if (tokenExpired) router.reload();
      } else {
        router.replace("/login");
      }
    });
  }, [tokenExpired, router]);
  return (
    <>
      <div className="min-h-full bg-slate-900">
        <Metatag title={title} />
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-black">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <CloseIcon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex items-center flex-shrink-0 px-4">
                    <img
                      className="w-auto h-8 mx-auto"
                      src="/sacred_chank_productions.png"
                      alt="Scared Chank Productions Logo"
                    />
                  </div>
                  <nav
                    className="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-gray-700"
                    aria-label="Sidebar"
                  >
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.id == page
                              ? "bg-gray-900 text-yellow-500"
                              : "text-gray-500 hover:text-yellow-500 hover:bg-gray-800",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md duration-500"
                          )}
                          aria-current={item.id == page ? "page" : undefined}
                        >
                          <item.icon
                            className="flex-shrink-0 w-6 h-6 mr-4"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="pt-6 mt-6">
                      <div className="px-2 space-y-1">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-2 py-2 text-base font-medium text-gray-500 duration-500 rounded-md group hover:text-yellow-500 hover:bg-gray-800"
                          >
                            <item.icon
                              className="w-6 h-6 mr-4 "
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-black">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="w-auto h-8 mx-auto"
                src="/sacred_chank_productions.png"
                alt="Sacred Chank Productions logo"
              />
            </div>
            <nav
              className="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-cyan-800"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.id == page
                        ? "bg-gray-900 text-yellow-500"
                        : "text-gray-500 hover:text-yellow-500 hover:bg-gray-800",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md duration-500"
                    )}
                    aria-current={item.id == page ? "page" : undefined}
                  >
                    <item.icon
                      className="flex-shrink-0 w-6 h-6 mr-4 "
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-6 mt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-gray-500 duration-500 rounded-md group hover:text-yellow-500 hover:bg-gray-800"
                    >
                      <item.icon className="w-6 h-6 mr-4 " aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-h-screen lg:pl-72 pattern1">
          <div className="relative z-10 flex flex-shrink-0 h-16 ">
            <button
              type="button"
              className="px-4 text-white focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="w-8 h-8" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex justify-end flex-1 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              {/* <div className="flex-1 "></div> */}
              <div className="flex items-center ml-4 md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex items-center max-w-xs overflow-hidden text-sm duration-500 border border-white rounded-full group focus:outline-none lg:hover:bg-black">
                      <PersonIcon className="w-10 h-10 p-1 bg-white rounded-l-full" />

                      <div className="relative flex justify-center h-10">
                        <div className="z-[9] top-0 bottom-0 self-center pr-4 ml-3 text-base text-white duration-500 group-hover:text-black font-bold">
                          {user
                            ? user.firstName + " " + user.lastName
                            : "Admin"}
                        </div>
                        <div className="absolute top-0 left-0 z-0 w-0 h-full duration-500 bg-white group-hover:w-full" />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/profile">
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              console.log("Hello");
                              const auth = getAuth();
                              localforage.clear();
                              auth.signOut();
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Logout
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="relative flex-1">
            {!tokenExpired ? (
              children
            ) : (
              <div className="absolute w-full h-full max-w-6xl sm:px-6 lg:px-8 animate-pulse">
                <div className="flex justify-center w-full h-full max-w-6xl border-2 border-white border-dashed rounded-lg">
                  <div className="self-center font-bold text-white text-7xl">
                    Loading
                  </div>
                </div>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>
      {loadingDialog != null && (
        <LoadingDialog
          showDialog={loadingDialog}
          setShowDialog={setLoadingDialog}
        />
      )}
      {dialogs}
    </>
  );
};

export default PageFrame;
