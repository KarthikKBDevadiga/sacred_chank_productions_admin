import next from 'next';
import { createKey } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classNames from '../helpers/classNames';
import urlCreator from '../helpers/urlCreator';
import { ArrowBackwardIcon, ArrowForwardIcon } from '../icons/all';

const Pagination = ({
  className,
  totalPages,
  currentPage,
  page,
  params = {},
}) => {
  const router = useRouter();
  const nextPage = parseInt(currentPage) + 1;
  const p = [];
  if (parseInt(totalPages) <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      p.push(
        <div
          key={i}
          onClick={() => {
            if (i != currentPage) {
              params.page = i;
              const url = urlCreator(page, params);
              router.push(url);
            }
          }}
          className={classNames(
            i == currentPage
              ? 'text-gray-900 bg-yellow-500 select-none'
              : 'text-white bg-gray-900 hover:bg-gray-600  cursor-pointer  hover:text-gray-900',
            'inline-flex items-center p-1 w-8 h-8 justify-center rounded-full text-sm font-medium  duration-500'
          )}
        >
          {i}
        </div>
      );
    }
  } else {
    if (currentPage <= 3) {
      const endIndex = 1 == currentPage ? 3 : parseInt(currentPage) + 1;
      for (let i = 1; i <= endIndex; i++) {
        p.push(
          <div
            key={i}
            onClick={() => {
              params.page = i;
              const url = urlCreator(page, params);
              router.push(url);
            }}
            className={classNames(
              i == parseInt(currentPage)
                ? 'text-gray-900 bg-yellow-500 select-none'
                : 'text-white bg-gray-900 hover:bg-gray-600  cursor-pointer  hover:text-gray-900',
              'inline-flex items-center p-1 w-8 h-8 justify-center rounded-full text-sm font-medium  duration-500'
            )}
          >
            {i}
          </div>
        );
      }
      p.push(
        <div
          key={endIndex + 1}
          className='inline-flex items-center justify-center w-8 h-8 p-1 text-sm font-medium text-white bg-gray-900 rounded-full select-none'
        >
          ??????
        </div>
      );
      const startIndex = parseInt(totalPages) - 2 + (endIndex - 3);
      for (let i = startIndex; i <= totalPages; i++) {
        p.push(
          <div
            key={i}
            onClick={() => {
              params.page = i;
              const url = urlCreator(page, params);
              router.push(url);
            }}
            className={classNames(
              i == parseInt(currentPage)
                ? 'text-gray-900 bg-yellow-500 select-none'
                : 'text-white bg-gray-900 hover:bg-gray-600  cursor-pointer  hover:text-gray-900',
              'inline-flex items-center p-1 w-8 h-8 justify-center rounded-full text-sm font-medium  duration-500'
              // (className =
              //   'inline-flex items-center justify-center w-8 h-8 p-1 text-sm font-medium text-white duration-500 border border-white rounded-full cursor-pointer hover:bg-white hover:text-gray-900')
            )}
          >
            {i}
          </div>
        );
      }
    } else if (currentPage > totalPages - 3) {
      let endIndex = 3 - (totalPages - parseInt(currentPage) >= 2 ? 1 : 0);
      for (let i = 1; i <= endIndex; i++) {
        p.push(
          <div
            key={i}
            onClick={() => {
              params.page = i;
              const url = urlCreator(page, params);
              router.push(url);
            }}
            className='inline-flex items-center justify-center w-8 h-8 p-1 text-sm font-medium duration-500 border border-white cursor-pointer hover:text-gray-900 hover:bg-white hover:border-green-700'
          >
            {i}
          </div>
        );
      }

      p.push(
        <div
          key={'...'}
          href='#'
          className='inline-flex items-center px-4 pt-4 text-sm font-medium border-t-2 border-transparent hover:text-gray-500 '
        >
          ??????
        </div>
      );
      const startIndex =
        totalPages == parseInt(currentPage)
          ? totalPages - 2
          : parseInt(currentPage) - 1;
      for (let i = startIndex; i <= totalPages; i++) {
        p.push(
          <div
            key={i}
            onClick={() => {
              params.page = i;
              const url = urlCreator(page, params);
              router.push(url);
            }}
            className={classNames(
              i == parseInt(currentPage)
                ? 'text-gray-900 bg-yellow-500 select-none'
                : 'text-white bg-gray-900 hover:bg-gray-600  cursor-pointer  hover:text-gray-900',
              'inline-flex items-center p-1 w-8 h-8 justify-center rounded-full text-sm font-medium  duration-500'
            )}
          >
            {i}
          </div>
        );
      }
    } else {
      p.push(
        <div
          onClick={() => {
            params.page = 1;
            const url = urlCreator(page, params);
            router.push(url);
          }}
          className='inline-flex items-center justify-center w-8 h-8 p-1 text-sm font-medium text-white duration-500 bg-gray-900 rounded-full cursor-pointer hover:bg-gray-600 hover:text-gray-900'
        >
          1
        </div>
      );
      p.push(
        <div
          key={'...'}
          className='inline-flex items-center justify-center w-8 h-8 p-1 text-sm font-medium text-white border border-white rounded-full'
        >
          ??????
        </div>
      );
      const startIndex = parseInt(currentPage) - 1;
      const endIndex = parseInt(currentPage) + 1;
      for (let i = startIndex; i <= endIndex; i++) {
        p.push(
          <div
            key={i}
            onClick={() => {
              params.page = i;
              const url = urlCreator(page, params);
              router.push(url);
            }}
            className={classNames(
              i == currentPage
                ? 'text-gray-900 bg-yellow-500 select-none'
                : 'text-white bg-gray-900 hover:bg-gray-600  cursor-pointer  hover:text-gray-900',
              'inline-flex items-center p-1 w-8 h-8 justify-center rounded-full text-sm font-medium  duration-500'
              // "inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent  duration-500 cursor-pointer"
            )}
          >
            {i}
          </div>
        );
      }
      p.push(
        <div
          key={'...'}
          className='inline-flex items-center justify-center w-8 h-8 p-1 text-sm font-medium text-white border border-white rounded-full'
        >
          ??????
        </div>
      );
      p.push(
        <div
          onClick={() => {
            params.page = totalPages;
            const url = urlCreator(page, params);
            router.push(url);
          }}
          className='inline-flex items-center justify-center w-8 h-8 p-1 text-sm font-medium text-white duration-500 bg-gray-900 rounded-full cursor-pointer hover:bg-gray-600 hover:text-gray-900'
        >
          {totalPages}
        </div>
      );
    }
  }
  if (currentPage > totalPages) return <></>;
  return (
    <nav
      className={classNames(
        className,
        'flex items-center justify-between px-4 mt-0 mb-4 sm:px-0'
      )}
    >
      <div className='flex flex-1 w-0 ml-4'>
        {currentPage > 1 ? (
          <div
            onClick={() => {
              params.page = currentPage - 1;
              const url = urlCreator(page, params);
              router.push(url);
            }}
            className={classNames(
              'group p-2 w-8 h-8 rounded-full  bg-gray-900 hover:bg-gray-600  duration-500 cursor-pointer'
            )}
          >
            <ArrowBackwardIcon
              className='w-full h-full text-gray-300 duration-500 group-hover:text-gray-900'
              aria-hidden='true'
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className='hidden gap-2 md:-mt-px md:flex'>
        {/* <div className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent select-none">
          {nextPage} of {totalPages}
        </div> */}
        {p}
      </div>
      <div className='flex justify-end flex-1 w-0 ml-2 mr-4 -mt-px '>
        {totalPages > currentPage ? (
          <div
            onClick={() => {
              params.page = currentPage + 1;
              const url = urlCreator(page, params);
              router.push(url);
            }}
            className={classNames(
              'group p-2 w-8 h-8 rounded-full  bg-gray-900 hover:bg-gray-600  duration-500 cursor-pointer'
            )}
          >
            <ArrowForwardIcon
              // className='w-full h-full text-gray-300 duration-500 group-hover:text-gray-900'
              className='w-full h-full text-gray-300 duration-500 group-hover:text-gray-900'
              aria-hidden='true'
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};
export default Pagination;
