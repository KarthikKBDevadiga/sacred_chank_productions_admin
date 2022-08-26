import { useState } from "react";
import random from "../helpers/random";
import ImageLoader from "../helpers/ImageLoader";
import classNames from "../helpers/classNames";

import emailValidator from "../helpers/emailValidator";
import passwordValidator from "../helpers/passwordValidator";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import Link from "next/link";
import Metatag from "../components/Metatag";
import { useRouter } from "next/router";
import LoadingDialog from "../components/dialog/LoadingDialog";
import ErrorDialog from "../components/dialog/ErrorDialog";
import setCookie from "../helpers/setCookie";
import Image from "next/image";
import MailIcon from "../icons/MailIcon";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import HidePasswordIcon from "../icons/HidePasswordIcon";
const googleProvider = new GoogleAuthProvider();

export default function Login({ randomPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  // const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const router = useRouter();
  const [loadingDialog, setLoadingDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorTitle, setErrorTitle] = useState();
  const [errorDescription, setErrorDescription] = useState();

  const reset = (event) => {
    event.target.email.value = "";
    event.target.password.value = "";
    setEmailError();
    setPasswordError();
    setShowPassword(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //Disable Both Email And Password Fields
    event.target.email.disabled = true;
    event.target.password.disabled = true;

    let isValid = true;
    const email = event.target.email.value;
    const password = event.target.password.value;

    //Validate The Email
    isValid = emailValidator(email, setEmailError);
    //Validate The Password
    isValid = passwordValidator(password, setPasswordError);

    if (isValid) {
      //Open The Loading Dialog
      setLoadingDialog(true);
      const auth = getAuth();
      //Login Using Email And Password
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          //Close Loading Dialog
          setLoadingDialog(false);
          const user = userCredential.user;
          setCookie("token", user.accessToken);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
          //Close Loading Dialog
          setLoadingDialog(false);
          //Reset The Input Fields
          reset(event);
          //Enable Both Email And Password Field
          event.target.email.disabled = false;
          event.target.password.disabled = false;
          //Set Error Dialog Title And Description
          setErrorTitle("Failed To Login");
          if (error.code == "auth/user-not-found") {
            setErrorDescription("User Not Found");
          } else if (error.code == "auth/wrong-password") {
            setErrorDescription("Wrong Password");
          }
          //Show The Error Dialog
          setErrorDialog(true);
        });
    } else {
      //Enable Both Email And Password Fields
      event.target.email.disabled = false;
      event.target.password.disabled = false;
    }
  };
  const loginWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Metatag title="Login" description="Admin Dashboard Login" />
      <div className="flex flex-col justify-center min-h-screen py-12 bg-slate-900 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            // layout="fill"
            // objectFit="cover"
            width={"100%"}
            layout="responsive"
            objectFit="contain"
            height={16}
            loader={ImageLoader}
            className="w-auto h-24 mx-auto"
            src="./sacred_chank_productions.png"
            alt="Workflow"
          />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-6 py-6 bg-gray-700 shadow sm:rounded-lg ">
            <h2 className="text-3xl font-extrabold text-center text-white ">
              Admin Login
            </h2>
            <form
              className="mt-10 space-y-6"
              action="#"
              method="POST"
              onSubmit={onSubmit}
            >
              <div className={classNames("relative w-full  col-span-2")}>
                <input
                  // ref={emailRef}
                  className={classNames(
                    "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                    emailError
                      ? "border-red-700 focus:border-red-500"
                      : "placeholder-shown:border-gray-500 focus:border-gray-100 border-white"
                  )}
                  name={"email"}
                  id={"email"}
                  type="email"
                  placeholder="Email"
                  onFocus={() => setEmailError()}
                />
                <MailIcon
                  className={classNames(
                    "absolute w-5 h-5  top-2.5 left-3 duration-200",
                    emailError
                      ? "text-red-700 peer-focus:text-red-500"
                      : " text-white peer-focus:text-white peer-placeholder-shown:text-gray-500"
                  )}
                />
                <label
                  htmlFor={"email"}
                  className={classNames(
                    "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                    " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                    "peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                    emailError
                      ? "text-red-700 peer-focus:text-red-500"
                      : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-white"
                  )}
                >
                  Email
                </label>
                {emailError && (
                  <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                    {emailError}
                  </div>
                )}
              </div>
              <div className={classNames("relative w-full  col-span-2")}>
                <input
                  // ref={emailRef}
                  className={classNames(
                    "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                    passwordError
                      ? "border-red-700 focus:border-red-500"
                      : "placeholder-shown:border-gray-500 focus:border-gray-100 border-white"
                  )}
                  name={"password"}
                  id={"password"}
                  type={showPassword ? "text" : "password"}
                  placeholder={randomPassword}
                  onFocus={() => setPasswordError()}
                />
                <div
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className={classNames(
                    passwordError
                      ? "text-red-700 peer-focus:text-red-500"
                      : " text-white peer-focus:text-white peer-placeholder-shown:text-gray-500",
                    " absolute inset-y-0 right-0 flex items-center pr-3  duration-200 cursor-pointer  hover:text-white"
                  )}
                >
                  {showPassword ? (
                    <HidePasswordIcon
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className={classNames(
                        "absolute w-5 h-5 top-2.5 right-3 "
                      )}
                    />
                  ) : (
                    <ShowPasswordIcon
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className={classNames(
                        "absolute w-5 h-5 top-2.5 right-3 "
                      )}
                    />
                  )}
                </div>

                <label
                  htmlFor={"password"}
                  className={classNames(
                    "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                    " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                    "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                    passwordError
                      ? "text-red-700 peer-focus:text-red-500"
                      : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-white"
                  )}
                >
                  Password
                </label>
                {passwordError && (
                  <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                    {passwordError}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white duration-500 bg-black border border-transparent rounded-md shadow-md hover:bg-gray-900"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <LoadingDialog
        showDialog={loadingDialog}
        setShowDialog={setLoadingDialog}
      />
      <ErrorDialog
        showDialog={errorDialog}
        setShowDialog={setErrorDialog}
        title={errorTitle}
        description={errorDescription}
      />
    </>
  );
}
export async function getServerSideProps(context) {
  const randomPassword = random(20);
  return {
    props: {
      randomPassword,
    },
  };
}
