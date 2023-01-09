import PageFrame from '../../components/PageFrame';
import { motion } from 'framer-motion';
import cookies from 'next-cookies';
import Image from 'next/image';
import classNames from '../../helpers/classNames';
import { useReducer, useState } from 'react';
import genericValidator from '../../helpers/genericValidator';
import {
  SaveIcon,
  DeleteIcon,
  MailIcon,
  PhoneIcon,
  KeyIcon,
  PlayIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  PersonIcon,
} from '../../icons/all';
import s3FileUpload from '../../helpers/s3FileUpload';
import moment from 'moment';
import CustomDialog from '../../components/dialog/CustomDialog';
import { useRouter } from 'next/router';
import Map from '../../components/Map';
import emailValidator from '../../helpers/emailValidator';
import { settings } from 'nprogress';
import urlCreator from '../../helpers/urlCreator';
import Pagination from '../../components/Pagination';

const size = 20;

export default function ContactUs({
  user,
  socialMedia,
  savedSettings,
  tokenExpired,
  token,
  data,
}) {
  const router = useRouter();

  const [name, setName] = useState(user.firstName);
  const [nameError, setNameError] = useState();

  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState();
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [phoneNumberError, setPhoneNumberError] = useState();

  const [loadingDialog, setLoadingDialog] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [dialogDescription, setDialogDescription] = useState();

  return (
    <>
      <PageFrame
        page='contactUs'
        title='Contact Us'
        user={user}
        socialMedia={socialMedia}
        tokenExpired={tokenExpired}
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      >
        {!tokenExpired && (
          <>
            <div className='max-w-6xl min-h-screen px-4 sm:px-6 lg:px-8'>
              <div className='relative h-64 overflow-hidden bg-gray-700 rounded-md'>
                <div className='flex justify-between px-4 py-3 bg-gray-800'>
                  <div className='self-center flex-shrink-0 mb-4 text-2xl text-white sm:mb-0 sm:mr-4'>
                    Contact Us
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 gap-4 p-4 -mt-48 overflow-hidden md:grid-cols-2 lg:grid-cols-3'>
                {data.contacts.map((contact, index) => {
                  return (
                    <div
                      onClick={() => {
                        router.push('contactUs/' + contact._id);
                      }}
                      key={index}
                      className='z-10 flex gap-2 p-2 text-gray-900 duration-500 bg-gray-500 rounded-md shadow-md cursor-pointer hover:shadow-lg'
                    >
                      <PersonIcon className='w-8 h-8' />
                      <div className='self-center '>
                        <div className='text-lg '>{contact.name}</div>
                        <div className='text-sm '>
                          {moment(user.createdAt)
                            .utcOffset('+05:30')
                            .format('hh:mm a, DD MMMM, YYYY')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Pagination
                page='actors'
                currentPage={data.pagination.page}
                totalPages={Math.ceil(data.pagination.count / size)}
              />
            </div>
            <CustomDialog
              showDialog={showDialog}
              setShowDialog={setShowDialog}
              title={dialogTitle}
              description={dialogDescription}
              success={() => {
                router.reload();
              }}
            />
          </>
        )}
      </PageFrame>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = cookies(context);
  const { page = 1 } = context.query;

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

  const savedSettings = tokenExpired
    ? {}
    : await fetch(process.env.BASE_API_URL + 'settings', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          tokenExpired = res.status == 401;
          return res.json();
        })
        .then((json) => json.settings)
        .catch((err) => {
          console.log(err);
        });

  console.log(savedSettings);

  const data = tokenExpired
    ? {}
    : await fetch(urlCreator(process.env.BASE_API_URL + 'contactUs', {}), {
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
  console.log(data);
  return {
    props: { token, tokenExpired, user, socialMedia, savedSettings, data },
  };
}
