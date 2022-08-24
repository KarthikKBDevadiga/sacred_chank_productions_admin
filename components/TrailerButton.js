import { useEffect, useState } from "react";
import classNames from "../helpers/classNames";
import { PlayIcon } from "../icons/all";

const TrailerButton = ({ className, onClick }) => {
  const [fullWidth, setFullWidth] = useState();
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "16px roboto";
    const { width } = context.measureText("Trailer");
    setFullWidth(Math.round(width + 24 + 4));
  }, [fullWidth]);

  return (
    <div
      onClick={onClick}
      className={classNames(
        " text-sm button flex items-center w-6 h-6 overflow-hidden  bg-black text-white duration-500 border-1 border-green-700 rounded-full cursor-pointer group active:scale-110 select-none",
        className
      )}
    >
      <PlayIcon className="items-center p-0.5 duration-500" />
      <div className="w-0 font-medium duration-500 opacity-0 whitespace-nowrap group-hover:opacity-100">
        Trailer
      </div>
      <style jsx>{`
        .button:hover {
          width: ${fullWidth}px;
        }
      `}</style>
    </div>
  );
};
export default TrailerButton;
