import Link from "next/link";
import classNames from "../helpers/classNames";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "../icons/all";
// import FacebookIcon from "../icons/FacebookIcon";
// import InstagramIcon from "../icons/InstagramIcon";
// import TwitterIcon from "../icons/TwitterIcon";

const Footer = ({ className }) => {
  return (
    <footer
      className={classNames("px-4 pb-8 mx-auto max-w-7xl w-full", className)}
    >
      <div className=" bg-white h-[2px] self-center rounded-full" />

      <div className="flex justify-center gap-8 py-4 ">
        <div
          onClick={() => {
            window.open(
              "https://www.facebook.com/NRI-Kannada-Balaga-111255714079808/?ti=as",
              "_blank"
            );
          }}
        >
          <FacebookIcon className="w-5 h-5 text-gray-400 duration-500 cursor-pointer sm:w-6 sm:h-6 hover:text-white" />
        </div>

        <div
          onClick={() => {
            window.open(
              "https://www.instagram.com/p/CKPin5UloX9/?igshid=1nh3ipb0rt6sa",
              "_blank"
            );
          }}
        >
          <InstagramIcon className="w-5 h-5 text-gray-400 duration-500 cursor-pointer sm:w-6 sm:h-6 hover:text-white" />
        </div>

        <div
          onClick={() => {
            window.open("https://twitter.com/BalagaNri", "_blank");
          }}
        >
          <TwitterIcon className="w-5 h-5 text-gray-400 duration-500 cursor-pointer sm:w-6 sm:h-6 hover:text-white" />
        </div>
      </div>
      <div className="text-sm text-center text-gray-400  sm:text-base">
        &copy; 2022 Sacred Chank Productions. All Rights Reserved
      </div>
    </footer>
  );
};
export default Footer;
