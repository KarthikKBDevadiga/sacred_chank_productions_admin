import React from "react";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import getYoutubeVideoId from "../../helpers/getYoutubeVideoId";

const YoutubeDialog = ({ url, showDialog, setShowDialog }) => {
  return (
    <Transition.Root show={showDialog} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={showDialog}
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
            <div className="self-center inline-block w-full overflow-hidden text-left align-bottom transition-all transform bg-black rounded-lg shadow-xl group sm:my-8 sm:align-middle sm:max-w-3xl">
              <div className="text-center">
                <div
                  className="relative h-0"
                  style={{ paddingBottom: "56.25%", paddingTop: "0px" }}
                >
                  <iframe
                    title="Video"
                    src={
                      "https://www.youtube.com/embed/" +
                      getYoutubeVideoId(url) +
                      "?rel=0"
                    }
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8">
                <button
                  type="button"
                  className="w-full h-full text-white transition duration-500 ease-out translate-x-8 -translate-y-8 bg-black shadow group-hover:translate-x-0 group-hover:translate-y-0 active:shadow-sm bg-lred rounded-bl-2xl focus:outline-none"
                  onClick={() => setShowDialog(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 p-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default YoutubeDialog;
