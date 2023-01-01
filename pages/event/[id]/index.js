import PageFrame from '../../../components/PageFrame';
import { motion } from 'framer-motion';
import Actor from '../../../components/items/Actor';
import cookies from 'next-cookies';
import { data } from 'autoprefixer';
import Image from 'next/image';
import ImageLoader from '../../../helpers/ImageLoader';
import classNames from '../../../helpers/classNames';
import { useReducer, useState } from 'react';
import genericValidator from '../../../helpers/genericValidator';
import {
  SaveIcon,
  DeleteIcon,
  ActorIcon,
  PlayIcon,
  CloseIcon,
  AddIcon,
  EditIcon,
} from '../../../icons/all';
import s3FileUpload from '../../../helpers/s3FileUpload';
import moment from 'moment';
import CustomDialog from '../../../components/dialog/CustomDialog';
import { useRouter } from 'next/router';
import TextareaAutosize from 'react-textarea-autosize';
import getYoutubeVideoId from '../../../helpers/getYoutubeVideoId';
import ActorSearchDialog from '../../../components/dialog/ActorSearchDialog';
import { setRequestMeta } from 'next/dist/server/request-meta';
import YoutubeDialog from '../../../components/dialog/YoutubeDialog';
import AddVideoDialog from '../../../components/dialog/AddVideoDialog';
import createKey from '../../../helpers/createKey';
import { ActionCodeOperation } from 'firebase/auth';
import BookTicketButton from '../../../components/BookTicketButton';
import AddBookTicketButton from '../../../components/AddBookTicketButton';
import AddTicketDialog from '../../../components/dialog/AddTicketDialog';

const MOVIE_ACTIONS = {
  UPDATE_MOVIE_TITLE: 'update_movie_title',
  UPDATE_MOVIE_DESCRIPTION: 'update_movie_description',
  UPDATE_MOVIE_RELEASE_DATE: 'update_movie_release_date',
  ADD_MOVIE_GENRE: 'add_movie_genre',
  REMOVE_MOVIE_GENRE: 'remove_movie_genre',
  ADD_MOVIE_LANGUAGE: 'add_movie_language',
  REMOVE_MOVIE_LANGUAGE: 'remove_movie_language',
  UPDATE_MOVIE_TRAILER: 'update_movie_trailer',
  UPDATE_MOVIE_POSTER_LANDSCAPE: 'update_movie_poster_landscape',
  UPDATE_MOVIE_POSTER_PORTRAIT: 'update_movie_poster_portrait',
  REMOVE_MOVIE_CAST: 'remove_movie_cast',
  ADD_MOVIE_CAST: 'add_movie_cast',
  ADD_MOVIE_PROMOTION: 'add_movie_promotion',
  REMOVE_MOVIE_PROMOTION: 'remove_movie_promotion',
  ADD_MOVIE_REVIEW: 'add_movie_review',
  REMOVE_MOVIE_REVIEW: 'remove_movie_review',
  Add_MOVIE_TICKET: 'add_movie_ticket',
  REMOVE_MOVIE_TICKET: 'remove_movie_ticket',
  UPDATE_MOVIE_STATUS: 'update_movie_status',
};

export default function UpdateMovie({
  user,
  socialMedia,
  tokenExpired,
  token,
  event,
  unavailable,
  tickets,
  seatsBought,
}) {
  const router = useRouter();

  const [loadingDialog, setLoadingDialog] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [dialogDescription, setDialogDescription] = useState();

  const [searchDialog, setSearchDialog] = useState(false);

  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState();

  const [addVideoDialog, setAddVideoDialog] = useState(false);

  const [addTicketDialog, setAddTicketDialog] = useState(false);

  const [videoDialogType, setVideoDialogType] = useState();

  return (
    <>
      <PageFrame
        title={event.name}
        page='events'
        user={user}
        socialMedia={socialMedia}
        tokenExpired={tokenExpired}
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      >
        {!tokenExpired && (
          <>
            <div className='grid h-full max-w-3xl grid-cols-1 gap-4 px-4 mx-auto my-24 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
              <div className='h-full space-y-4 lg:col-start-1 lg:col-span-2'>
                <div className='flex flex-col gap-2 mx-auto'>
                  {event.layout.map((block, i) => {
                    return (
                      <div key={i} className='mx-auto w-max'>
                        <div className='flex justify-between pt-4 pb-2 pl-8 text-white'>
                          <div className='text-sm w-max'>{block.title}</div>
                          <div>€{block.price}</div>
                        </div>

                        <div className='h-[1px] bg-white' />
                        <div className='flex flex-col gap-2 mt-3'>
                          {block.rows.map((row, j) => {
                            return (
                              <div className='flex gap-2 mx-auto' key={j}>
                                <div className='flex items-center justify-center w-6 h-6 text-sm text-white '>
                                  {row.name}
                                </div>
                                <dib className='flex gap-2'>
                                  {row.seats != null &&
                                    row.seats.map((i, k) => {
                                      if (i.type == 'SEAT') {
                                        const seatBought = seatsBought.find(
                                          (s) => {
                                            // console.log(
                                            //   row.name,
                                            //   i.number,
                                            //   s.seat.row,
                                            //   s.seat.number
                                            // );
                                            return (
                                              row.name == s.seat.row &&
                                              i.number == s.seat.number
                                            );
                                          }
                                        );
                                        // console.log(seatBought);
                                        if (seatBought) {
                                          // console.log(seatBought);
                                          console.log(seatBought);
                                        }
                                        // const seatBought = seatsBought.find(
                                        //   (s) => {
                                        //     s.seatNo == i.row + ':' + i.number;
                                        //   }
                                        // );
                                        // console.log(seatBought);
                                        return (
                                          <div
                                            data-tooltip={seatBought?.user.name}
                                            key={k}
                                            className={classNames(
                                              'flex items-center justify-center w-6 h-6 text-xs duration-500 border rounded-sm ',
                                              seatBought == null
                                                ? 'border-whit text-white select-none'
                                                : 'bg-yellow-600 border-yellow-500 text-slate-900 cursor-pointer'
                                            )}
                                          >
                                            {i.number}
                                          </div>
                                        );
                                      } else {
                                        return <div className='w-6 h-6'></div>;
                                      }
                                    })}
                                </dib>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  <div className='mx-auto text-white animate-screen'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='110px'
                      viewBox='0 0 200 55'
                      width='400px'
                      // fill="currentColor"
                    >
                      <defs>
                        <linearGradient
                          id='myGradient'
                          gradientTransform='rotate(90)'
                        >
                          <stop offset='0%' stopColor='transparent' />
                          <stop offset='90%' stopColor='yellow' />
                          <stop offset='100%' stopColor='currentColor' />
                        </linearGradient>
                      </defs>
                      <path
                        d='M 0 0 L 200 0 L 140 50 L 60 50 Z'
                        fill="url('#myGradient')"
                      />
                      <path
                        d='M 60 50 L 140 50 L 140 55 L 60 55 Z'
                        fill='white'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='overflow-hidden rounded-md shadow-md bg-slate-700 lg:col-start-3 lg:col-span-1 h-max'>
                <div>Button Click</div>
              </div>
            </div>
          </>
        )}
      </PageFrame>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = cookies(context);

  if (token == null || token == '') {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
  let tokenExpired;
  const loginData = await fetch(process.env.BASE_API_URL + 'users/logged', {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then((res) => {
      tokenExpired = res.status == 401;
      return res.json();
    })
    .then((json) => json)
    .catch((err) => {
      console.log(err);
    });

  const user = tokenExpired ? {} : loginData.user;
  const socialMedia = tokenExpired ? {} : loginData.socialMedia;

  const event = await fetch(
    process.env.BASE_API_URL + 'event/' + context.params.id
  )
    .then((res) => res.json())
    .then((json) => json);

  console.log(event);
  const tickets = await fetch(
    process.env.BASE_API_URL +
      'event/' +
      context.params.id +
      '/tickets/booked/v2'
  )
    .then((res) => res.json())
    .then((json) => json);

  // console.log(tickets);
  const unavailable = [];
  const seatsBought = [];
  tickets.map((t) => {
    // console.log(t);
    unavailable.push(t.row + ':' + t.number);
    seatsBought.push({
      seat: t.seat,
      user: t.user,
    });
  });

  return {
    props: {
      token,
      tokenExpired,
      user,
      socialMedia,
      event,
      unavailable,
      tickets,
      seatsBought,
    },
  };
}
