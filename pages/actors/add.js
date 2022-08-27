import PageFrame from "../../components/PageFrame";
import { motion } from "framer-motion";
import Actor from "../../components/items/Actor";
import cookies from "next-cookies";
import { data } from "autoprefixer";
import Image from "next/image";
import ImageLoader from "../../helpers/ImageLoader";
import classNames from "../../helpers/classNames";
import { useState } from "react";
import genericValidator from "../../helpers/genericValidator";
import { SaveIcon, DeleteIcon, ActorIcon } from "../../icons/all";
import s3FileUpload from "../../helpers/s3FileUpload";
import moment from "moment";
import CustomDialog from "../../components/dialog/CustomDialog";
import { useRouter } from "next/router";

export default function AddActor({ actor, user, tokenExpired, token }) {
  const router = useRouter();
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState();

  const [name, setName] = useState();
  const [nameError, setNameError] = useState();
  const [loadingDialog, setLoadingDialog] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [dialogDescription, setDialogDescription] = useState();

  const save = () => {
    let isValid = true;
    isValid = genericValidator(image, setImageError, "Actor Image") && isValid;
    isValid = genericValidator(name, setNameError, "Name") && isValid;
    if (isValid) {
      setLoadingDialog(true);
      const body = {
        image,
        name,
      };
      console.log(body);
      let status = 200;
      fetch(process.env.BASE_API_URL + "actors/", {
        method: "post",
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
          if (status == 201) {
            setShowDialog(true);
            setDialogTitle("Successful!");
            setDialogDescription("Actor Data Added Successfully");
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
        user={user}
        tokenExpired={tokenExpired}
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      >
        <div className="max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-4 overflow-hidden bg-gray-700 rounded-md shadow-md lg:col-start-1 lg:col-span-2">
              <div className="px-4 py-3 text-lg font-bold text-white bg-gray-800">
                Add
              </div>
              <div className="px-4">
                <div className="flex mx-auto text-sm text-gray-600 w-max">
                  <label
                    htmlFor="file-upload"
                    className="relative font-medium rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none "
                  >
                    <div className="relative w-48 h-48 group">
                      <div
                        className="absolute overflow-hidden rounded-md"
                        style={{
                          height: "192px",
                          width: "192px",
                        }}
                      >
                        {image ? (
                          <Image
                            alt="Profile Picture"
                            height={196}
                            width={196}
                            objectFit="cover"
                            loader={ImageLoader}
                            className="flex-shrink-0 object-cover w-10 h-10 ml-auto mr-auto "
                            src={image}
                          />
                        ) : (
                          <ActorIcon
                            className={classNames(
                              imageError ? "bg-red-700" : "bg-gray-800",
                              "flex-shrink-0 object-cover w-48 h-48 text-gray-700"
                            )}
                          />
                        )}
                      </div>
                      <div className="absolute flex flex-col justify-end w-48 h-48 overflow-hidden duration-500 rounded-md cursor-pointer peer group hover:bg-black/50">
                        <div className="py-3 font-bold text-center text-white duration-500 translate-y-full bg-black group-hover:translate-y-0">
                          Upload
                        </div>
                      </div>
                    </div>
                    <input
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file != null) uploadLogo(file);
                      }}
                      accept="image/png, image/jpeg"
                      onFocus={() => setImageError()}
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
                <div className={"relative w-full mt-4"}>
                  <input
                    // ref={emailRef}
                    className={classNames(
                      "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                      nameError
                        ? "border-red-700 focus:border-red-500"
                        : "placeholder-shown:border-gray-500 focus:border-gray-100 border-white"
                    )}
                    name={"name"}
                    id={"name"}
                    type="name"
                    placeholder="Name"
                    defaultValue={name}
                    onFocus={() => setNameError()}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label
                    htmlFor={"name"}
                    className={classNames(
                      "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                      " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                      "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                      nameError
                        ? "text-red-700 peer-focus:text-red-500"
                        : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-white"
                    )}
                  >
                    Name
                  </label>
                  {nameError && (
                    <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                      {nameError}
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="w-full h-0.5 mt-4 bg-white rounded-full" /> */}
              <div className="flex justify-end gap-2 px-4 py-3 bg-gray-800">
                <div
                  className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                  onClick={() => {
                    save();
                  }}
                >
                  <SaveIcon />
                </div>
              </div>
            </div>

            <div className="overflow-hidden bg-gray-700 rounded-md shadow-md lg:col-start-3 lg:col-span-1 h-max"></div>
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

  return { props: { token, tokenExpired, user } };
}
