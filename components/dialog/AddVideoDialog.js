import React, { useState } from "react";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AddIcon, DeleteIcon, DoneIcon, PlayIcon } from "../../icons/all";
import classNames from "../../helpers/classNames";
import getYoutubeVideoId from "../../helpers/getYoutubeVideoId";

const AddVideoDialog = ({ showDialog, setShowDialog, onData }) => {
  const [name, setName] = useState();
  const [nameError, setNameError] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [videoUrlError, setVideoUrlError] = useState();

  const onSubmit = () => {
    setShowDialog(false);
    setName();
    setVideoUrl();
    if (onData) setTimeout(() => onData(name, videoUrl), 300);
  };
  return (
    <Transition.Root show={showDialog} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setShowDialog}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full overflow-hidden text-left align-bottom transition-all transform bg-gray-700 shadow-xl rounded-2xl sm:my-8 sm:align-middle sm:max-w-lg">
              <div className="p-4 rounded-3xl">
                <div className="p-2 ">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className={"relative  w-full"}>
                      <input
                        // ref={emailRef}
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          nameError
                            ? "border-red-700 focus:border-red-500"
                            : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
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
                            : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
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
                    <div className={"relative  mt-4 w-full"}>
                      <input
                        // ref={emailRef}
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          videoUrlError
                            ? "border-red-700 focus:border-red-500"
                            : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                        )}
                        name={"video"}
                        id={"video"}
                        type="url"
                        placeholder="Video"
                        defaultValue={videoUrl}
                        onFocus={() => setVideoUrlError()}
                        onChange={(event) => setVideoUrl(event.target.value)}
                      />
                      <label
                        htmlFor={"video"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          videoUrlError
                            ? "text-red-700 peer-focus:text-red-500"
                            : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                        )}
                      >
                        Video URL
                      </label>
                      {videoUrlError && (
                        <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                          {videoUrlError}
                        </div>
                      )}
                    </div>
                    <div className="relative justify-center w-full h-full max-w-full mt-4 ml-auto overflow-hidden bg-black rounded-md cursor-pointer aspect-video group md:w-64">
                      <img
                        src={
                          "https://img.youtube.com/vi/" +
                          getYoutubeVideoId(videoUrl) +
                          "/hqdefault.jpg"
                        }
                        className="object-cover w-full h-full duration-500 group-hover:blur-sm"
                        frameBorder="0"
                        allowFullScreen
                      />
                      <div className="absolute top-0 left-0 flex justify-center w-full h-full">
                        <PlayIcon className="self-center w-16 h-16 text-gray-700 " />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 px-4 py-3 bg-gray-800">
                <div
                  className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                  onClick={() => {
                    onSubmit();
                  }}
                >
                  <AddIcon />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddVideoDialog;
