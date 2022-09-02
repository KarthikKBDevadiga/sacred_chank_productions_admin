import { useRouter } from "next/router";
import AddIcon from "../icons/AddIcon";

const AddBookTicketButton = ({ name, onClick }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex w-full h-32 cursor-pointer group " onClick={onClick}>
        <div className="flex flex-col">
          <div className="relative w-5 h-5 overflow-hidden before:rounded-full before:absolute before:-left-5 before:-top-5 before:w-10 before:h-10 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
          <div className="flex flex-1 ">
            <div className="flex flex-col justify-between ">
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
            </div>
            <div className="flex-1 h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
          </div>

          <div className="relative w-5 h-5 overflow-hidden before:rounded-full before:absolute before:-left-5 before:-bottom-5 before:w-10 before:h-10 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
        </div>

        <div className="relative flex-1 px-1 py-2 duration-500 bg-gray-400 group-hover:bg-gray-500">
          <div className="flex flex-col h-full border border-gray-900 rounded-md">
            <div className="w-full p-1 text-sm font-semibold text-center text-gray-900 h-7"></div>
            <div className="h-px bg-gray-700" />
            <div className="flex flex-1">
              <div className="flex h-full px-2 text-xl border-r border-gray-700 w-max">
                <div className="self-center font-bold text-gray-900 w-9">
                  <AddIcon className="mx-auto" />
                </div>
              </div>
              <div className="self-center px-2 font-bold text-gray-900 line-2">
                {name}
              </div>
            </div>
            <div className="h-px bg-gray-700" />
            <div className="p-1 text-sm font-semibold text-center text-gray-900 h-7"></div>
          </div>
          <div className="absolute top-0 w-full ">
            <div className="px-1 mx-auto text-xs text-gray-900 duration-500 bg-gray-400 w-max group-hover:bg-gray-500">
              sacred chank production
            </div>
          </div>
          <div className="absolute w-full bottom-0.5 ">
            <div className="px-1 mx-auto text-xs text-gray-900 duration-500 bg-gray-400 w-max group-hover:bg-gray-500">
              movie ticket
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative w-5 h-5 overflow-hidden before:rounded-full before:absolute before:-right-5 before:-top-5 before:w-10 before:h-10 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
          <div className="flex flex-1 ">
            <div className="flex-1 h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
            <div className="flex flex-col justify-between ">
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-gray-400 group-hover:bg-gray-500" />
            </div>
          </div>
          <div className="relative w-5 h-5 overflow-hidden before:rounded-full before:absolute before:-right-5 before:-bottom-5 before:w-10 before:h-10 before:shadow-[0_500px_0px_500px_rgb(156,163,175)] group-hover:before:shadow-[0_500px_0px_500px_rgb(107,114,128)] before:duration-500" />
        </div>
      </div>
    </>
  );
};
export default AddBookTicketButton;
