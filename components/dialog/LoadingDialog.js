import React from "react";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ProgressBar from "../ProgressBar";

const LoadingDialog = ({ showDialog, setShowDialog }) => {
  return (
    <Transition.Root show={showDialog} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={showDialog}
        onClose={setShowDialog}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center pointer-events-none sm:block sm:p-0">
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
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-gray-700 rounded-lg shadow-xl w-min sm:my-8 sm:align-middle sm:p-6">
              <div className="m-4 sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  {/* <Step /> */}
                  <ProgressBar />
                </div>
                <button className="w-0 h-0 overflow-hidden" />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingDialog;
