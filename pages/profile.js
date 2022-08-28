import PageFrame from "../components/PageFrame";
import { motion } from "framer-motion";
import cookies from "next-cookies";
import Image from "next/image";
import classNames from "../helpers/classNames";
import { useState } from "react";
import genericValidator from "../helpers/genericValidator";
import { SaveIcon, DeleteIcon, MailIcon, PhoneIcon } from "../icons/all";
import s3FileUpload from "../helpers/s3FileUpload";
import moment from "moment";
import CustomDialog from "../components/dialog/CustomDialog";
import { useRouter } from "next/router";

export default function ProfileScreen({ user, tokenExpired, token }) {
  const router = useRouter();

  const [name, setName] = useState(user.firstName);
  const [nameError, setNameError] = useState();

  const [firstName, setFirstName] = useState(user.firstName);
  const [firstNameError, setFirstNameError] = useState();
  const [lastName, setLastName] = useState(user.lastName);
  const [lastNameError, setLastNameError] = useState();
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState();
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState();

  const [loadingDialog, setLoadingDialog] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [dialogDescription, setDialogDescription] = useState();

  const saveActor = () => {
    let isValid = true;
    isValid = genericValidator(image, setImageError, "Actor Image") && isValid;
    isValid = genericValidator(name, setNameError, "Name") && isValid;
    if (isValid) {
      setLoadingDialog(true);
      const body = {
        id: actor._id,
        image,
        name,
      };
      console.log(body);
      let status = 200;
      fetch(process.env.BASE_API_URL + "actors/" + actor._id, {
        method: "put",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          setLoadingDialog(false);

          status = res.status;
          return res.json();
        })
        .then((json) => {
          console.log(status);
          console.log(json);
          if (status == 200) {
            setShowDialog(true);
            setDialogTitle("Successful!");
            setDialogDescription("Actor Data Updated Successfully");
          } else {
            // setErrorTitle("Failed To Signup");
            // setErrorDescription(json.message);
            // setErrorDialog(true);
          }
        })
        .catch((err) => {
          // setLoadingDialog(false);
          console.log(err);
        });
    }
  };

  const deleteActor = () => {
    setLoadingDialog(true);
    const status = 200;
    fetch(process.env.BASE_API_URL + "actors/" + actor._id, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setLoadingDialog(false);
        status = res.status;
        return res.json();
      })
      .then((json) => {
        console.log(status);
        console.log(json);
        if (status == 200) {
          setShowDialog(true);
          setDialogTitle("Successful!");
          setDialogDescription("Actor Data Deleted Successfully");
          // setSuccessTitle("Successful!");
          // setSuccessDescription("Successfully Updated An Instructor");
          // setSuccessDialog(true);
        } else {
          // setErrorTitle("Failed To Signup");
          // setErrorDescription(json.message);
          // setErrorDialog(true);
        }
      })
      .catch((err) => {
        // setLoadingDialog(false);
        console.log(err);
      });
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
        page="actors"
        title="Profile Page"
        user={user}
        tokenExpired={tokenExpired}
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      >
        <div className="max-w-6xl max-h-screen px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <motion.div
              className="space-y-4 overflow-hidden bg-gray-700 rounded-md shadow-md lg:col-start-1 lg:col-span-2"
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                once: true,
              }}
            >
              <div className="px-4 py-3 text-lg font-bold text-white bg-gray-800">
                Profile
              </div>
              <div className="px-4">
                <div className={"relative w-full"}>
                  <input
                    // ref={emailRef}
                    className={classNames(
                      "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                      firstNameError
                        ? "border-red-700 focus:border-red-500"
                        : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                    )}
                    disabled={true}
                    name={"first_name"}
                    id={"first_name"}
                    type="name"
                    placeholder="First Name"
                    defaultValue={firstName}
                    onFocus={() => setFirstNameError()}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <label
                    htmlFor={"first_name"}
                    className={classNames(
                      "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                      " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                      "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                      firstNameError
                        ? "text-red-700 peer-focus:text-red-500"
                        : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                    )}
                  >
                    First Name
                  </label>
                  {firstNameError && (
                    <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                      {firstNameError}
                    </div>
                  )}
                </div>
                <div className={"relative w-full mt-4"}>
                  <input
                    disabled={true}
                    // ref={emailRef}
                    className={classNames(
                      "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                      lastNameError
                        ? "border-red-700 focus:border-red-500"
                        : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                    )}
                    name={"last_name"}
                    id={"last_name"}
                    type="name"
                    placeholder="Last Name"
                    defaultValue={lastName}
                    onFocus={() => setLastNameError()}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                  <label
                    htmlFor={"last_name"}
                    className={classNames(
                      "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                      " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                      "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                      lastNameError
                        ? "text-red-700 peer-focus:text-red-500"
                        : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                    )}
                  >
                    Last Name
                  </label>
                  {lastNameError && (
                    <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                      {lastNameError}
                    </div>
                  )}
                </div>
                <div className={"relative w-full mt-4"}>
                  <input
                    disabled={true}
                    // ref={emailRef}
                    className={classNames(
                      "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                      emailError
                        ? "border-red-700 focus:border-red-500"
                        : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                    )}
                    name={"email"}
                    id={"email"}
                    type="name"
                    placeholder="Email"
                    defaultValue={email}
                    onFocus={() => setEmailError()}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <MailIcon
                    className={classNames(
                      "absolute w-5 h-5  top-2.5 left-3 duration-200",
                      emailError
                        ? "text-red-700 peer-focus:text-red-500"
                        : " text-gray-500 peer-focus:text-white "
                    )}
                  />
                  <label
                    htmlFor={"email"}
                    className={classNames(
                      "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                      " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                      "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                      emailError
                        ? "text-red-700 peer-focus:text-red-500"
                        : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
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
                <div className={"relative w-full mt-4"}>
                  <input
                    disabled={true}
                    // ref={emailRef}
                    className={classNames(
                      "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                      phoneNumberError
                        ? "border-red-700 focus:border-red-500"
                        : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                    )}
                    name={"phone_number"}
                    id={"phone_number"}
                    type="name"
                    placeholder="Phone Number"
                    defaultValue={phoneNumber}
                    onFocus={() => setPhoneNumberError()}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                  <PhoneIcon
                    className={classNames(
                      "absolute w-5 h-5  top-2.5 left-3 duration-200",
                      phoneNumberError
                        ? "text-red-700 peer-focus:text-red-500"
                        : " text-gray-500 peer-focus:text-white "
                    )}
                  />
                  <label
                    htmlFor={"phone_number"}
                    className={classNames(
                      "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                      " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                      "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                      phoneNumberError
                        ? "text-red-700 peer-focus:text-red-500"
                        : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                    )}
                  >
                    Phone Number
                  </label>
                  {phoneNumberError && (
                    <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                      {phoneNumberError}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2 px-4 py-3 bg-gray-800">
                <div
                  className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                  onClick={() => {
                    // save();
                    // deleteActor();
                  }}
                >
                  <DeleteIcon />
                </div>
                <div
                  className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                  onClick={() => {
                    // saveActor();
                  }}
                >
                  <SaveIcon />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="overflow-hidden bg-gray-700 rounded-md shadow-md lg:col-start-3 lg:col-span-1 h-max"
              viewport={{ once: true }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                once: true,
              }}
            >
              <div className="px-4 py-3 text-lg font-bold text-white bg-gray-800">
                Details
              </div>
              <div className="px-4 pt-4 pb-2">
                <div className="self-center text-xs font-normal text-gray-500 text-medium">
                  Created On
                </div>
                <div className="self-center text-base font-normal text-white text-medium">
                  {moment(user.createdAt)
                    .utcOffset("+05:30")
                    .format("hh:mm a, DD MMMM, YYYY")}
                </div>
              </div>
              <div className="px-4 pt-2 pb-4">
                <div className="self-center text-xs font-normal text-gray-500 text-medium">
                  Updated On
                </div>
                <div className="self-center text-base font-normal text-white text-medium">
                  {moment(user.updatedAt)
                    .utcOffset("+05:30")
                    .format("hh:mm a, DD MMMM, YYYY")}
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
            router.back();
          }}
        />
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
  const user = await fetch(process.env.BASE_API_URL + "users/logged", {
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

  console.log(user);

  return { props: { token, tokenExpired, user } };
}
