import { useRouter } from "next/router";
import CloseIcon from "../icons/CloseIcon";

const BookTicketButton = ({ name, rating, theater, timing, url, onRemove }) => {
  const router = useRouter();
  return (
    <>
      <div
        className="flex w-full h-32 cursor-pointer group "
        onClick={() => {
          // window.open(url, "_blank");
        }}
      >
        <div className="flex flex-col">
          <div className="relative w-5 h-5 overflow-hidden before:rounded-full before:absolute before:-left-5 before:-top-5 before:w-10 before:h-10 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
          <div className="flex flex-1 ">
            <div className="flex flex-col justify-between ">
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-left-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
            </div>
            <div className="flex-1 h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
          </div>

          <div className="relative w-5 h-5 overflow-hidden before:rounded-full before:absolute before:-left-5 before:-bottom-5 before:w-10 before:h-10 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
        </div>

        <div className="relative flex-1 px-1 py-2 duration-500 bg-amber-400 group-hover:bg-amber-500">
          <div className="flex flex-col h-full border rounded-md border-amber-900">
            <div className="w-full p-1 text-sm font-semibold text-center text-amber-900">
              {timing}
            </div>
            <div className="h-px bg-amber-700" />
            <div className="flex flex-1">
              <div className="flex h-full px-2 text-xl border-r border-amber-700 w-max">
                <div className="self-center font-bold text-amber-900">
                  {rating}
                </div>
              </div>
              <div className="flex self-center w-full px-2 font-bold text-amber-900">
                <div className="flex-1 line-2">{name}</div>
                {onRemove && (
                  <div
                    className="duration-500 bg-white bg-opacity-0 rounded-full hover:bg-opacity-25"
                    onClick={onRemove ? onRemove : () => {}}
                  >
                    <CloseIcon />
                  </div>
                )}
              </div>
            </div>
            <div className="h-px bg-amber-700" />
            <div className="p-1 text-sm font-semibold text-center text-amber-900">
              {theater}
            </div>
          </div>
          <div className="absolute top-0 w-full ">
            <div className="px-1 mx-auto text-xs duration-500 w-max bg-amber-400 text-amber-900 group-hover:bg-amber-500">
              sacred chank production
            </div>
          </div>
          <div className="absolute w-full bottom-0.5 ">
            <div className="px-1 mx-auto text-xs duration-500 w-max bg-amber-400 text-amber-900 group-hover:bg-amber-500">
              movie ticket
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="relative w-5 h-5 overflow-hidden before:rounded-full before:absolute before:-right-5 before:-top-5 before:w-10 before:h-10 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
          <div className="flex flex-1 ">
            <div className="flex-1 h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
            <div className="flex flex-col justify-between ">
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
              <div className="relative w-1 h-2 overflow-hidden before:rounded-full before:absolute before:-right-1 before:w-2 before:h-2 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
              <div className="flex-1 w-full h-full duration-500 bg-amber-400 group-hover:bg-amber-500" />
            </div>
          </div>
          <div className="relative w-5 h-5 overflow-hidden before:rounded-full before:absolute before:-right-5 before:-bottom-5 before:w-10 before:h-10 before:shadow-[0_500px_0px_500px_rgb(251,191,36)] group-hover:before:shadow-[0_500px_0px_500px_rgb(245,158,11)] before:duration-500" />
        </div>
      </div>
    </>
  );
};
export default BookTicketButton;
