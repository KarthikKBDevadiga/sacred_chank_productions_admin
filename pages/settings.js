import PageFrame from '../components/PageFrame';
import { motion } from 'framer-motion';
import cookies from 'next-cookies';
import Image from 'next/image';
import classNames from '../helpers/classNames';
import { useReducer, useState } from 'react';
import genericValidator from '../helpers/genericValidator';
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
} from '../icons/all';
import s3FileUpload from '../helpers/s3FileUpload';
import moment from 'moment';
import CustomDialog from '../components/dialog/CustomDialog';
import { useRouter } from 'next/router';
import Map from '../components/Map';
import emailValidator from '../helpers/emailValidator';
import { settings } from 'nprogress';

const SETTING_ACTIONS = {
  UPDATE_EMAIL: 'update_email',
  UPDATE_PHONE_NUMBER: 'update_phone_number',
  UPDATE_LOCATION: 'update_location',
  UPDATE_LATITUDE: 'update_latitude',
  UPDATE_LONGITUDE: 'update_longitude',
  UPDATE_FACEBOOK: 'update_facebook',
  UPDATE_INSTAGRAM: 'update_instagram',
  UPDATE_TWITTER: 'update_twitter',
  UPDATE_ERROR: 'update_error',
};

export default function ProfileScreen({
  user,
  socialMedia,
  savedSettings,
  tokenExpired,
  token,
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

  const reducer = (setting, action) => {
    console.log(setting);
    switch (action.type) {
      case SETTING_ACTIONS.UPDATE_EMAIL:
        return { ...setting, email: action.payload.email };
      case SETTING_ACTIONS.UPDATE_PHONE_NUMBER:
        return { ...setting, phoneNumber: action.payload.phoneNumber };
      case SETTING_ACTIONS.UPDATE_LOCATION:
        return { ...setting, location: action.payload.location };
      case SETTING_ACTIONS.UPDATE_LATITUDE:
        return { ...setting, latitude: action.payload.latitude };
      case SETTING_ACTIONS.UPDATE_LONGITUDE:
        return { ...setting, longitude: action.payload.longitude };
      case SETTING_ACTIONS.UPDATE_FACEBOOK:
        return { ...setting, facebook: action.payload.facebook };
      case SETTING_ACTIONS.UPDATE_INSTAGRAM:
        return { ...setting, instagram: action.payload.instagram };
      case SETTING_ACTIONS.UPDATE_TWITTER:
        return { ...setting, twitter: action.payload.twitter };
      case SETTING_ACTIONS.UPDATE_ERROR:
        return {
          ...setting,
          emailError: action.payload.emailError,
          phoneNumberError: action.payload.phoneNumberError,
          locationError: action.payload.locationError,
          facebookError: action.payload.facebookError,
          instagramError: action.payload.instagramError,
          twitterError: action.payload.twitterError,
        };
      default:
        return { ...setting };
    }
  };
  const [setting, dispatch] = useReducer(reducer, {
    email: savedSettings.contact.email,
    phoneNumber: savedSettings.contact.phoneNumber,
    facebook: savedSettings.socialMedia.facebook,
    instagram: savedSettings.socialMedia.instagram,
    twitter: savedSettings.socialMedia.twitter,
    location: savedSettings.contact.location.address,
    latitude: 52.3559766,
    longitude: -7.7276328,
  });

  const saveProfile = () => {
    let isValid = true;
    validate();
    if (isValid) {
      setLoadingDialog(true);
      const body = {
        contact: {
          email: setting.email,
          phoneNumber: setting.phoneNumber,
          location: {
            address: setting.location,
            latitude: setting.latitude,
            longitude: setting.longitude,
          },
        },
        socialMedia: {
          facebook: setting.facebook,
          instagram: setting.instagram,
          twitter: setting.twitter,
        },
      };
      console.log(body);
      let status = 200;
      fetch(process.env.BASE_API_URL + 'settings', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          setLoadingDialog(false);
          status = res.status;
          return res.json();
        })
        .then((json) => {
          console.log(status);
          console.log(json);
          if (status == 200) {
            setShowDialog(true);
            setDialogTitle('Successful!');
            setDialogDescription('Profile Updated Successfully');
          } else {
            // setErrorTitle("Failed To Signup");
            // setErrorDescription(json.message);
            // setErrorDialog(true);
          }
        })
        .catch((err) => {
          // setLoadingDialog(false);
          console.log(err);
        });
    }
  };
  const validate = () => {
    const emailError = emailValidator(setting.email) ? '' : 'Invalid Email';
    const phoneNumberError = genericValidator(setting.phoneNumber)
      ? ''
      : 'Phone Number Cant Be Empty';
    const location = genericValidator(setting.location)
      ? ''
      : 'Location Cant Be Empty';
    const facebookError = genericValidator(setting.facebook)
      ? ''
      : 'Location Cant Be Empty';
    const instagramError = genericValidator(setting.instagram)
      ? ''
      : 'Location Cant Be Empty';
    const twitterError = genericValidator(setting.twitter)
      ? ''
      : 'Location Cant Be Empty';
  };

  return (
    <>
      <PageFrame
        page='settings'
        title='Settings'
        user={user}
        socialMedia={socialMedia}
        tokenExpired={tokenExpired}
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      >
        {!tokenExpired && (
          <>
            <div className='max-w-6xl min-h-screen px-4 sm:px-6 lg:px-8'>
              <div className='grid max-w-3xl grid-cols-1 gap-4 mx-auto lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
                <motion.div
                  className='space-y-4 bg-gray-700 rounded-md shadow-md lg:col-start-1 lg:col-span-2'
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -200 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    once: true,
                  }}
                >
                  <div className='px-4 py-3 text-lg font-bold text-white bg-gray-800 rounded-t-md'>
                    Settings
                  </div>
                  <div className=''>
                    <div className='flex gap-4 px-4 text-gray-300'>
                      <div>Contact Information</div>
                      <div className='self-center flex-1 h-0.5 bg-gray-300 rounded-full' />
                    </div>
                    <div className='px-4'>
                      <div className={'relative w-full mt-4'}>
                        <input
                          // ref={emailRef}
                          className={classNames(
                            'w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ',
                            setting.emailError
                              ? 'border-red-700 focus:border-red-500'
                              : 'placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600'
                          )}
                          name={'email'}
                          id={'email'}
                          type='email'
                          placeholder='Email'
                          defaultValue={setting.email}
                          onFocus={() => setEmailError()}
                          onChange={(event) => {
                            dispatch({
                              type: SETTING_ACTIONS.UPDATE_EMAIL,
                              payload: {
                                email: event.target.value,
                              },
                            });
                          }}
                        />
                        <MailIcon
                          className={classNames(
                            'absolute w-5 h-5  top-2.5 left-3 duration-200',
                            setting.emailError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : ' text-gray-500 peer-focus:text-white '
                          )}
                        />
                        <label
                          htmlFor={'email'}
                          className={classNames(
                            'absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4',
                            ' peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs',
                            'peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent',
                            setting.emailError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : 'peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500'
                          )}
                        >
                          Email
                        </label>
                        {setting.emailError && (
                          <div className='absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500'>
                            {setting.emailError}
                          </div>
                        )}
                      </div>
                      <div className={'relative w-full mt-4'}>
                        <input
                          // ref={emailRef}
                          className={classNames(
                            'w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ',
                            setting.phoneNumberError
                              ? 'border-red-700 focus:border-red-500'
                              : 'placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600'
                          )}
                          name={'phone'}
                          id={'phone'}
                          type='tel'
                          placeholder='Phone Number'
                          defaultValue={setting.phoneNumber}
                          onFocus={() => setEmailError()}
                          onChange={(event) => {
                            dispatch({
                              type: SETTING_ACTIONS.UPDATE_PHONE_NUMBER,
                              payload: {
                                phoneNumber: event.target.value,
                              },
                            });
                          }}
                        />
                        <PhoneIcon
                          className={classNames(
                            'absolute w-5 h-5  top-2.5 left-3 duration-200',
                            setting.phoneNumberError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : ' text-gray-500 peer-focus:text-white '
                          )}
                        />
                        <label
                          htmlFor={'phone'}
                          className={classNames(
                            'absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4',
                            ' peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs',
                            'peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent',
                            setting.phoneNumberError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : 'peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500'
                          )}
                        >
                          Phone Number
                        </label>
                        {emailError && (
                          <div className='absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500'>
                            {emailError}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='flex gap-4 px-4 mt-4 text-gray-300'>
                      <div>Location</div>
                      <div className='self-center flex-1 h-0.5 bg-gray-300 rounded-full' />
                    </div>
                    <div></div>
                    <div className='relative mt-4'>
                      <Map
                        latitude={setting.latitude}
                        setLatitude={(value) => {
                          dispatch({
                            type: SETTING_ACTIONS.UPDATE_LATITUDE,
                            payload: {
                              latitude: value,
                            },
                          });
                        }}
                        longitude={setting.longitude}
                        setLongitude={(value) => {
                          dispatch({
                            type: SETTING_ACTIONS.UPDATE_LONGITUDE,
                            payload: {
                              longitude: value,
                            },
                          });
                        }}
                      />
                      <div className='absolute top-0 right-0 flex justify-center w-full h-full pointer-events-none'>
                        <img
                          className='self-center h-20 -mt-20'
                          src='/marker.png'
                        />
                      </div>
                    </div>
                    <div className='px-4'>
                      <div className={'relative w-full mt-4'}>
                        <input
                          // ref={emailRef}
                          className={classNames(
                            'w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ',
                            setting.locationError
                              ? 'border-red-700 focus:border-red-500'
                              : 'placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600'
                          )}
                          name={'location'}
                          id={'location'}
                          type='name'
                          placeholder='Location'
                          defaultValue={setting.location}
                          onFocus={() => setEmailError()}
                          onChange={(event) => {
                            dispatch({
                              type: SETTING_ACTIONS.UPDATE_LOCATION,
                              payload: {
                                location: event.target.value,
                              },
                            });
                          }}
                        />
                        <MailIcon
                          className={classNames(
                            'absolute w-5 h-5  top-2.5 left-3 duration-200',
                            setting.locationError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : ' text-gray-500 peer-focus:text-white '
                          )}
                        />
                        <label
                          htmlFor={'location'}
                          className={classNames(
                            'absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4',
                            ' peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs',
                            'peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent',
                            setting.locationError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : 'peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500'
                          )}
                        >
                          Location
                        </label>
                        {setting.locationError && (
                          <div className='absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500'>
                            {setting.locationError}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='flex gap-4 px-4 mt-4 text-gray-300'>
                      <div>Social Media</div>
                      <div className='self-center flex-1 h-0.5 bg-gray-300 rounded-full' />
                    </div>
                    <div className='px-4'>
                      <div className={'relative w-full mt-4'}>
                        <input
                          className={classNames(
                            'w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ',
                            setting.facebookError
                              ? 'border-red-700 focus:border-red-500'
                              : 'placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600'
                          )}
                          name={'facebook'}
                          id={'facebook'}
                          type='name'
                          placeholder='Facebook'
                          defaultValue={setting.facebook}
                          onFocus={() => setEmailError()}
                          onChange={(event) => {
                            dispatch({
                              type: SETTING_ACTIONS.UPDATE_FACEBOOK,
                              payload: {
                                facebook: event.target.value,
                              },
                            });
                          }}
                        />
                        <FacebookIcon
                          className={classNames(
                            'absolute w-5 h-5  top-2.5 left-3 duration-200',
                            setting.facebookError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : ' text-gray-500 peer-focus:text-white '
                          )}
                        />
                        <label
                          htmlFor={'facebook'}
                          className={classNames(
                            'absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4',
                            ' peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs',
                            'peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent',
                            setting.facebookError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : 'peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500'
                          )}
                        >
                          Facebook
                        </label>
                        {setting.facebookError && (
                          <div className='absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500'>
                            {setting.facebookError}
                          </div>
                        )}
                      </div>
                      <div className={'relative w-full mt-4'}>
                        <input
                          // ref={emailRef}
                          className={classNames(
                            'w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ',
                            setting.instagramError
                              ? 'border-red-700 focus:border-red-500'
                              : 'placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600'
                          )}
                          name={'instagram'}
                          id={'instagram'}
                          type='name'
                          placeholder='Instagram'
                          defaultValue={setting.instagram}
                          onFocus={() => setEmailError()}
                          onChange={(event) => {
                            dispatch({
                              type: SETTING_ACTIONS.UPDATE_INSTAGRAM,
                              payload: {
                                instagram: event.target.value,
                              },
                            });
                          }}
                        />
                        <InstagramIcon
                          className={classNames(
                            'absolute w-5 h-5  top-2.5 left-3 duration-200',
                            setting.instagramError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : ' text-gray-500 peer-focus:text-white '
                          )}
                        />
                        <label
                          htmlFor={'instagram'}
                          className={classNames(
                            'absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4',
                            ' peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs',
                            'peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent',
                            setting.instagramError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : 'peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500'
                          )}
                        >
                          Instagram
                        </label>
                        {setting.instagramError && (
                          <div className='absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500'>
                            {setting.instagramError}
                          </div>
                        )}
                      </div>
                      <div className={'relative w-full mt-4'}>
                        <input
                          // ref={emailRef}
                          className={classNames(
                            'w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-10 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ',
                            setting.twitterError
                              ? 'border-red-700 focus:border-red-500'
                              : 'placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600'
                          )}
                          name={'twitter'}
                          id={'twitter'}
                          type='name'
                          placeholder='Twitter'
                          defaultValue={setting.twitter}
                          onFocus={() => setEmailError()}
                          onChange={(event) => {
                            dispatch({
                              type: SETTING_ACTIONS.UPDATE_TWITTER,
                              payload: {
                                twitter: event.target.value,
                              },
                            });
                          }}
                        />
                        <TwitterIcon
                          className={classNames(
                            'absolute w-5 h-5  top-2.5 left-3 duration-200',
                            setting.twitterError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : ' text-gray-500 peer-focus:text-white '
                          )}
                        />
                        <label
                          htmlFor={'twitter'}
                          className={classNames(
                            'absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4',
                            ' peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs',
                            'peer-placeholder-shown:top-2 peer-placeholder-shown:left-8 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent',
                            setting.twitterError
                              ? 'text-red-700 peer-focus:text-red-500'
                              : 'peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500'
                          )}
                        >
                          Twitter
                        </label>
                        {setting.twitterError && (
                          <div className='absolute px-2 text-xs text-red-700 bg-gray-700 -bottom-1.5 right-4 peer-focus:text-red-500'>
                            {setting.twitterError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end gap-2 px-4 py-3 bg-gray-800 rounded-b-md'>
                    <div
                      data-tooltip={'Save'}
                      data-tooltip-location='bottom'
                      className='p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600'
                      onClick={() => {
                        saveProfile();
                      }}
                    >
                      <SaveIcon />
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
                      {moment(savedSettings.createdAt)
                        .utcOffset('+05:30')
                        .format('hh:mm a, DD MMMM, YYYY')}
                    </div>
                  </div>
                  <div className='px-4 pt-2 pb-4'>
                    <div className='self-center text-xs font-normal text-gray-500 text-medium'>
                      Updated On
                    </div>
                    <div className='self-center text-base font-normal text-white text-medium'>
                      {moment(savedSettings.updatedAt)
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
  return { props: { token, tokenExpired, user, socialMedia, savedSettings } };
}
