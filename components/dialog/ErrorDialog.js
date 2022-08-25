import React from "react";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ErrorDialog = ({ showDialog, setShowDialog, title, description }) => {
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
            <div className="inline-block w-full overflow-hidden text-left align-bottom transition-all transform bg-white shadow-xl rounded-2xl sm:my-8 sm:align-middle sm:max-w-lg">
              <div className="p-4 sm:items-center">
                <div>
                  <div className="m-auto text-red-500 rounded-full bg-red-500/50 w-max">
                    {/* <svg className="text-green-400 w-28 h-28" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                      <path
                        id="path_1"
                        d="M 16.41 13.89 C 16.06 13.67 15.59 13.78 15.38 14.13 C 14.64 15.3 13.38 16 12 16 C 10.62 16 9.36 15.3 8.62 14.12 C 8.4 13.77 7.94 13.66 7.59 13.88 C 7.24 14.1 7.13 14.56 7.35 14.91 C 8.37 16.54 10.1 17.5 12 17.5 C 13.9 17.5 15.63 16.53 16.65 14.92 C 16.87 14.57 16.76 14.11 16.41 13.89 Z" />
                    </svg> */}
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      height="128px"
                      width="128px"
                      fill="currentColor"
                    >
                      <g data-name="1" id="_1">
                        <path d="M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z" />
                        <path d="M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z" />
                        <path d="M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="mt-4 text-center sm:text-center">
                  <div className="text-3xl font-medium leading-6">{title}</div>
                  <div className="mt-2">
                    <p className="text-lg">{description}</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-6 h-6 m-2">
                <button
                  type="button"
                  className="w-full h-full text-white duration-500 bg-red-400 bg-opacity-50 rounded-full shadow hover:shadow-xl active:shadow-sm focus:outline-none hover:bg-opacity-100"
                  onClick={() => setShowDialog(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 p-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-5 sm:mt-4">
                <div
                  onClick={() => setShowDialog(false)}
                  className="p-4 text-lg font-medium text-center text-white duration-500 bg-red-400 bg-opacity-50 cursor-pointer hover:bg-red-400"
                >
                  CLOSE
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ErrorDialog;
