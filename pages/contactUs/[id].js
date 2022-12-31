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
import FlagIcon from '../../icons/FlagIcon';
import CommentIcon from '../../icons/CommentIcon';

const size = 20;

export default function ContactUs({
  user,
  socialMedia,
  savedSettings,
  tokenExpired,
  token,
  contactUs,
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
            <div className='max-w-6xl max-h-screen px-4 overflow-hidden sm:px-6 lg:px-8'>
              <div className='grid max-w-3xl grid-cols-1 gap-4 mx-auto lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
                <motion.div
                  className='overflow-hidden bg-gray-700 rounded-md shadow-md lg:col-start-1 lg:col-span-2'
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -200 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    once: true,
                  }}
                >
                  <div className='px-4 py-3 text-lg font-bold text-white bg-gray-800'>
                    Contact Us
                  </div>
                  <div className='p-4'>
                    <div className='flex items-center gap-2 text-white'>
                      <PersonIcon className='w-5 h-5 mt-0.5 text-gray-500' />
                      <div className='flex-1 text-base'>{contactUs.name}</div>
                    </div>
                    <div className='flex items-center gap-2 mt-4 text-white'>
                      <MailIcon className='w-5 h-5 mt-0.5 text-gray-500' />
                      <div className='flex-1 text-base'>{contactUs.email}</div>
                    </div>
                    <div className='flex items-center gap-2 mt-4 text-white'>
                      <PhoneIcon className='w-5 h-5 mt-0.5 text-gray-500' />
                      <div className='flex-1 text-base'>
                        {contactUs.phoneNumber}
                      </div>
                    </div>
                    <div className='flex items-center gap-2 mt-4 text-white'>
                      <FlagIcon className='w-5 h-5 mt-0.5 text-gray-500' />
                      <div className='flex-1 text-base'>
                        {contactUs.country}
                      </div>
                    </div>
                    <div className='flex gap-2 mt-4 text-white'>
                      <CommentIcon className='w-5 h-5 mt-0.5 text-gray-500' />
                      <div className='flex-1 text-base'>
                        This si the Sample EMsssage And Thyhis is the examplea
                        sasfa af asdgf a dg adg asdgd
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className='overflow-hidden bg-gray-700 rounded-md shadow-md lg:col-start-3 lg:col-span-1 h-max'
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    once: true,
                  }}
                >
                  <div className='px-4 py-3 text-lg font-bold text-white bg-gray-800'>
                    Details
                  </div>
                  <div className='px-4 pt-4 pb-2'>
                    <div className='self-center text-xs font-normal text-gray-500 text-medium'>
                      Created On
                    </div>
                    <div className='self-center text-base font-normal text-white text-medium'>
                      {moment(contactUs.createdAt)
                        .utcOffset('+05:30')
                        .format('hh:mm a, DD MMMM, YYYY')}
                    </div>
                  </div>
                  <div className='px-4 pt-2 pb-4'>
                    <div className='self-center text-xs font-normal text-gray-500 text-medium'>
                      Updated On
                    </div>
                    <div className='self-center text-base font-normal text-white text-medium'>
                      {moment(contactUs.updatedAt)
                        .utcOffset('+05:30')
                        .format('hh:mm a, DD MMMM, YYYY')}
                    </div>
                  </div>
                </motion.div>
              </div>
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

  const contactUs = tokenExpired
    ? {}
    : await fetch(process.env.BASE_API_URL + 'contactUs/' + context.params.id, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          tokenExpired = res.status == 401;
          return res.json();
        })
        .then((json) => json.contactUs)
        .catch((err) => {
          console.log(err);
        });
  console.log(contactUs);
  return {
    props: { token, tokenExpired, user, socialMedia, savedSettings, contactUs },
  };
}
