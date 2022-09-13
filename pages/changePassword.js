import PageFrame from "../components/PageFrame";
import { motion } from "framer-motion";
import cookies from "next-cookies";
import Image from "next/image";
import classNames from "../helpers/classNames";
import { useState } from "react";
import genericValidator from "../helpers/genericValidator";
import {
  SaveIcon,
  DeleteIcon,
  MailIcon,
  PhoneIcon,
  KeyIcon,
} from "../icons/all";
import s3FileUpload from "../helpers/s3FileUpload";
import moment from "moment";
import CustomDialog from "../components/dialog/CustomDialog";
import { useRouter } from "next/router";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import HidePasswordIcon from "../icons/HidePasswordIcon";

export default function ProfileScreen({
  user,
  tokenExpired,
  token,
  socialMedia,
}) {
  const router = useRouter();

  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState();

  const [confirmPassword, setConfirmPassword] = useState();
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState();

  const [loadingDialog, setLoadingDialog] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [dialogDescription, setDialogDescription] = useState();

  const updatePassword = () => {
    let isValid = true;
  };

  const uploadLogo = async (file) => {
    setLoadingDialog(true);
    const data = await s3FileUpload(file, "headshots");
    console.log(data);
    setImage(data.url);
    setLoadingDialog(false);
  };

  return (
    <>
      <PageFrame
        page="profile"
        title="Profile Page"
        user={user}
        tokenExpired={tokenExpired}
        loadingDialog={loadingDialog}
        socialMedia={socialMedia}
        setLoadingDialog={setLoadingDialog}
      >
        {!tokenExpired && (
          <>
            <div className="max-w-6xl max-h-screen px-4 sm:px-6 lg:px-8">
              <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <motion.div
                  className="space-y-4 bg-gray-700 rounded-md shadow-md lg:col-start-1 lg:col-span-2"
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -200 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    once: true,
                  }}
                >
                  <div className="px-4 py-3 text-lg font-bold text-white bg-gray-800 rounded-t-md">
                    Change Password
                  </div>
                  <div className="px-4">
                    <div className={classNames("relative w-full ")}>
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
                        // placeholder={randomPassword}
                        onChange={(event) => setPassword(event.target.value)}
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
                    <div className={classNames("relative w-full mt-4")}>
                      <input
                        // ref={emailRef}
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          confirmPasswordError
                            ? "border-red-700 focus:border-red-500"
                            : "placeholder-shown:border-gray-500 focus:border-gray-100 border-white"
                        )}
                        name={"confirmPassword"}
                        id={"confirmPassword"}
                        type={confirmShowPassword ? "text" : "password"}
                        // placeholder={randomPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        onFocus={() => setConfirmPasswordError()}
                      />
                      <div
                        onClick={() => {
                          setConfirmShowPassword(!showPassword);
                        }}
                        className={classNames(
                          confirmPasswordError
                            ? "text-red-700 peer-focus:text-red-500"
                            : " text-white peer-focus:text-white peer-placeholder-shown:text-gray-500",
                          " absolute inset-y-0 right-0 flex items-center pr-3  duration-200 cursor-pointer  hover:text-white"
                        )}
                      >
                        {confirmShowPassword ? (
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
                        htmlFor={"confirmPassword"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          confirmPasswordError
                            ? "text-red-700 peer-focus:text-red-500"
                            : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-white"
                        )}
                      >
                        Confirm Password
                      </label>
                      {confirmPasswordError && (
                        <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                          {confirmPasswordError}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 px-4 py-3 bg-gray-800 rounded-b-md">
                    <div
                      data-tooltip={"Change Password"}
                      data-tooltip-location="bottom"
                      className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                      onClick={() => {
                        updatePassword();
                      }}
                    >
                      <SaveIcon />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <CustomDialog
              showDialog={showDialog}
              setShowDialog={setShowDialog}
              title={dialogTitle}
              description={dialogDescription}
              success={() => {
                router.reload();
              }}
            />
          </>
        )}
      </PageFrame>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = cookies(context);

  if (token == null || token == "") {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  let tokenExpired;
  const loginData = await fetch(process.env.BASE_API_URL + "users/logged", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      tokenExpired = res.status == 401;
      return res.json();
    })
    .then((json) => json)
    .catch((err) => {
      console.log(err);
    });

  const user = tokenExpired ? {} : loginData.user;
  const socialMedia = tokenExpired ? {} : loginData.socialMedia;

  console.log(user);

  return { props: { token, tokenExpired, user, socialMedia } };
}
