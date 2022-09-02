import { Fragment, useEffect, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  SearchIcon,
  ExpandIcon,
  DoneIcon,
  AddIcon,
  ArrowForwardIcon,
  CloseIcon,
  ProfileIcon,
} from "../../icons/all";
import Image from "next/image";
import urlCreator from "../../helpers/urlCreator";
import classNames from "../../helpers/classNames";
import ImageLoader from "../../helpers/ImageLoader";

const ActorSearchDialog = ({
  showDialog,
  setShowDialog,
  active,
  selectedActor,
  accessToken,
}) => {
  const [selected, setSelected] = useState();
  const [actors, setActors] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("Here");
    const timer = setTimeout(async () => {
      getActors();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    getActors();
  }, [showDialog]);

  const getActors = async () => {
    const params = {
      q: query,
    };

    const data = await fetch(
      urlCreator(process.env.BASE_API_URL + "actors", params),
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => json)
      .catch((err) => {
        console.log(err);
      });

    const a = [];

    // data.actors.map((actor) => a.push(actor));

    setActors(
      data.actors.filter((actor) => {
        // console.log(active);
        // console.log(active.find((a) => a._id == actor._id) == null);
        return active?.find((a) => a.id == actor._id) == null;
      })
    );
  };

  return (
    <Transition.Root
      show={showDialog}
      as={Fragment}
      afterLeave={() => {
        setTimeout(() => {
          setQuery("");
          setActors([]);
          setSelected();
        }, 300);
      }}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={(value) => {
          setShowDialog(value);
        }}
      >
        <div className="flex items-end justify-center px-4 pt-4 text-center sm:block sm:p-0">
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
          {/* <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-full sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 -translate-y-full sm:scale-95"
          >
            <div className="max-w-3xl mx-auto mt-24 transition-all transform bg-gray-700 shadow-2xl mx-auto1 rounded-xl ring-1 ring-black ring-opacity-5">
              <div className="flex p-4 ">
                <SearchIcon
                  className="w-6 h-6 text-gray-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  className="w-full pl-2 pr-4 text-white placeholder-gray-400 bg-transparent border-0 outline-none focus:ring-0 "
                  placeholder="Search..."
                  value={query}
                  onChange={(event) => {
                    setQuery(
                      event.target.value.length == 1
                        ? event.target.value.trim()
                        : event.target.value
                    );
                  }}
                />
              </div>

              <div className="flex mx-4 mb-2">
                <div className="text-xs text-left text-gray-400 select-none">
                  {query ? (
                    <>
                      Search results for &#8220;
                      <span className="text-white">{query}</span>&#8221;
                    </>
                  ) : (
                    <>All Actors</>
                  )}
                  {/* Search results for &#8220;
                  <span className="text-white">{query}</span>&#8221; */}
                </div>
                <div className="self-center flex-1 h-px ml-4 bg-gray-400 rounded-sm"></div>
              </div>

              <div className="flex px-4 pb-4 overflow-hidden">
                <div
                  className={classNames(
                    "max-h-64 min-w-0 flex-auto scroll-py-4 overflow-y-auto duration-500 pr-2",
                    selected ? "sm:h-64  w-3xl" : "w-full"
                  )}
                >
                  <div className="text-sm text-gray-700">
                    {actors?.map((actor) => (
                      <div
                        onClick={() => {
                          setSelected(actor);
                        }}
                        key={actor._id}
                        value={actor}
                        className={classNames(
                          "flex cursor-pointer select-none items-center rounded-md p-2 group  hover:bg-gray-600 duration-500 text-green-900",
                          selected == actor && "bg-gray-600 duration-500"
                        )}
                      >
                        <span className="flex-auto ml-1 text-left text-white truncate">
                          {actor.name}
                        </span>

                        <ArrowForwardIcon
                          className="flex-none w-5 h-5 ml-3 text-white group-hover:animate-next"
                          aria-hidden="true"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={classNames(
                    " duration-500 ",
                    selected
                      ? "w-1/2 translate-x-0 pl-2 opacity-100"
                      : "w-0 translate-x-full opacity-0"
                  )}
                >
                  {selected && (
                    <div className="flex-col flex-none hidden h-full overflow-y-auto duration-500 bg-gray-800 rounded-lg shadow-lg sm:flex">
                      {/* profile details coming */}
                      <div className="flex-none p-4 text-center text-green-900">
                        {selected.image ? (
                          <img
                            className="object-cover w-32 h-32 mx-auto duration-500 rounded-md group-hover:grayscale group-hover:scale-150 group-hover:translate-x-1/4"
                            src={selected.image}
                          />
                        ) : (
                          <>
                            <ProfileIcon className="w-16 h-16 mx-auto text-green-900 rounded-full" />
                          </>
                        )}
                        <h2 className="mt-2 text-lg font-semibold text-white">
                          {selected.name}
                        </h2>
                      </div>

                      <div className="flex flex-row justify-between flex-auto px-4 pb-4 ">
                        <div
                          onClick={() => {
                            setSelected();
                          }}
                          text="Clear"
                          className="self-end text-white duration-500 bg-gray-700 border-green-700 rounded-full cursor-pointer hover:bg-gray-900"
                        >
                          <CloseIcon className="items-center w-10 h-10 p-2" />
                        </div>
                        <div
                          className="self-end text-white duration-500 bg-gray-700 border-green-700 rounded-full cursor-pointer hover:bg-gray-900"
                          onClick={() => {
                            setShowDialog(false);
                            if (selectedActor)
                              setTimeout(() => selectedActor(selected), 300);
                          }}
                          text="Select"
                        >
                          <DoneIcon className="items-center w-10 h-10 p-2" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {query !== "" && actors.length === 0 && (
                <div className="px-6 pt-2 pb-4 text-sm text-center sm:px-14">
                  <p className="font-semibold text-white ">No Actors Found</p>
                  <p className="mt-2 text-gray-200">
                    We could not find anything with that &#8220;{query}&#8221; .
                    Please try again.
                  </p>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ActorSearchDialog;
