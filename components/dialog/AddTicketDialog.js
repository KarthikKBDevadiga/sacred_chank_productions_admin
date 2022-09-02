import React, { useState } from "react";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AddIcon, DeleteIcon, DoneIcon, PlayIcon } from "../../icons/all";
import classNames from "../../helpers/classNames";
import getYoutubeVideoId from "../../helpers/getYoutubeVideoId";
import genericValidator from "../../helpers/genericValidator";

const AddTicketDialog = ({ showDialog, setShowDialog, onData }) => {
  const [rating, setRating] = useState();
  const [ratingError, setRatingError] = useState();
  const [timing, setTiming] = useState();
  const [timingError, setTimingError] = useState();
  const [theater, setTheater] = useState();
  const [theaterError, setTheaterError] = useState();
  const [url, setUrl] = useState();
  const [urlError, setUrlError] = useState();

  const onSubmit = () => {
    const isValid = true;
    isValid = genericValidator(rating, setRatingError, "Rating") && isValid;
    isValid = genericValidator(timing, setTimingError, "Timing") && isValid;
    isValid =
      genericValidator(theater, setTheaterError, "Theater Name") && isValid;
    isValid = genericValidator(url, setUrlError, "Ticket Url") && isValid;

    if (isValid) {
      setShowDialog(false);
      setRating();
      setTiming();
      setTheater();
      setUrl();
      if (onData) setTimeout(() => onData(rating, timing, theater, url), 300);
    }
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
                          ratingError
                            ? "border-red-700 focus:border-red-500"
                            : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                        )}
                        name={"rating"}
                        id={"rating"}
                        type="name"
                        placeholder="Rating"
                        defaultValue={rating}
                        onFocus={() => setRatingError()}
                        onChange={(event) => setRating(event.target.value)}
                      />
                      <label
                        htmlFor={"name"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          ratingError
                            ? "text-red-700 peer-focus:text-red-500"
                            : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                        )}
                      >
                        Rating
                      </label>
                      {ratingError && (
                        <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                          {ratingError}
                        </div>
                      )}
                    </div>
                    <div className={"relative mt-4 w-full"}>
                      <input
                        // ref={emailRef}
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          timingError
                            ? "border-red-700 focus:border-red-500"
                            : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                        )}
                        name={"timing"}
                        id={"timing"}
                        type="text"
                        placeholder="Timing"
                        defaultValue={timing}
                        onFocus={() => setTimingError()}
                        onChange={(event) => setTiming(event.target.value)}
                      />
                      <label
                        htmlFor={"timing"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          timingError
                            ? "text-red-700 peer-focus:text-red-500"
                            : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                        )}
                      >
                        Timing
                      </label>
                      {timingError && (
                        <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                          {timingError}
                        </div>
                      )}
                    </div>
                    <div className={"relative mt-4 w-full"}>
                      <input
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          theaterError
                            ? "border-red-700 focus:border-red-500"
                            : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                        )}
                        name={"theater"}
                        id={"theater"}
                        type="name"
                        placeholder="Theater"
                        defaultValue={theater}
                        onFocus={() => setTheaterError()}
                        onChange={(event) => setTheater(event.target.value)}
                      />
                      <label
                        htmlFor={"theater"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          theaterError
                            ? "text-red-700 peer-focus:text-red-500"
                            : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                        )}
                      >
                        Theater Name
                      </label>
                      {theaterError && (
                        <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                          {theaterError}
                        </div>
                      )}
                    </div>
                    <div className={"relative  mt-4 w-full"}>
                      <input
                        // ref={emailRef}
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          urlError
                            ? "border-red-700 focus:border-red-500"
                            : "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                        )}
                        name={"url"}
                        id={"url"}
                        type="url"
                        placeholder="Url"
                        defaultValue={url}
                        onFocus={() => setUrlError()}
                        onChange={(event) => setUrl(event.target.value)}
                      />
                      <label
                        htmlFor={"url"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          urlError
                            ? "text-red-700 peer-focus:text-red-500"
                            : "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                        )}
                      >
                        Ticket URL
                      </label>
                      {urlError && (
                        <div className="absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500">
                          {urlError}
                        </div>
                      )}
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

export default AddTicketDialog;
