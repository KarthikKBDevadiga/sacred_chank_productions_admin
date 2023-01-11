import Link from 'next/link';
import classNames from '../helpers/classNames';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '../icons/all';
// import FacebookIcon from "../icons/FacebookIcon";
// import InstagramIcon from "../icons/InstagramIcon";
// import TwitterIcon from "../icons/TwitterIcon";

const Footer = ({ className, socialMedia }) => {
  return (
    <footer
      className={classNames(
        'px-4 pb-8 mx-auto max-w-7xl w-full mt-4',
        className
      )}
    >
      <div className=' bg-white h-[2px] self-center rounded-full' />

      <div className='flex justify-center gap-8 py-4 '>
        {socialMedia.facebook && (
          <div
            data-tooltip={'Facebook'}
            data-tooltip-location='bottom'
            onClick={() => {
              window.open(socialMedia.facebook, '_blank');
            }}
          >
            <FacebookIcon className='w-5 h-5 text-gray-400 duration-500 cursor-pointer sm:w-6 sm:h-6 hover:text-white' />
          </div>
        )}

        {socialMedia.instagram && (
          <div
            data-tooltip={'Instagram'}
            data-tooltip-location='bottom'
            onClick={() => {
              window.open(socialMedia.instagram, '_blank');
            }}
          >
            <InstagramIcon className='w-5 h-5 text-gray-400 duration-500 cursor-pointer sm:w-6 sm:h-6 hover:text-white' />
          </div>
        )}

        {socialMedia.twitter && (
          <div
            data-tooltip={'Twitter'}
            data-tooltip-location='bottom'
            onClick={() => {
              window.open(socialMedia.twitter, '_blank');
            }}
          >
            <TwitterIcon className='w-5 h-5 text-gray-400 duration-500 cursor-pointer sm:w-6 sm:h-6 hover:text-white' />
          </div>
        )}
      </div>
      <div className='text-sm text-center text-gray-400 sm:text-base'>
        &copy; 2023{' '}
        <span
          className='duration-500 cursor-pointer hover:text-yellow-500'
          onClick={() => {
            window.open('https://www.sacredchankproductions.com', '_blank');
          }}
        >
          Sacred Chank Productions
        </span>
        . All Rights Reserved
      </div>
    </footer>
  );
};
export default Footer;
