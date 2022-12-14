import PageFrame from '../../components/PageFrame';
import { motion } from 'framer-motion';
import Movie from '../../components/items/Movie';
import cookies from 'next-cookies';
import AddIcon from '../../icons/AddIcon';
import { useRouter } from 'next/router';
import BookTicketButton from '../../components/BookTicketButton';

export default function Movies({
  data,
  user,
  tokenExpired,
  socialMedia,
  events,
}) {
  const router = useRouter();
  return (
    <>
      <PageFrame
        page='events'
        user={user}
        tokenExpired={tokenExpired}
        socialMedia={socialMedia}
      >
        {!tokenExpired && (
          <div className='max-w-6xl sm:px-6 lg:px-8'>
            <div className='relative overflow-hidden bg-gray-700 rounded-md'>
              <div className='flex justify-between px-4 py-3 bg-gray-800'>
                <div className='self-center flex-shrink-0 mb-4 text-2xl text-white sm:mb-0 sm:mr-4'>
                  Event
                </div>
                <div
                  className='p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600'
                  onClick={() => {
                    router.push('/movies/add');
                  }}
                >
                  <AddIcon />
                </div>
              </div>
            </div>
            {/* <div className='grid grid-cols-1 gap-4 p-4 -mt-48 overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'> */}
            {/* {data.movies.map((movie, index) => {
                return (
                  <motion.div
                    key={index}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: 200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      ease: 'easeInOut',
                      duration: 0.5,
                      delay: 0.25 * index,
                      once: true,
                    }}
                  >
                    <Movie
                      key={movie}
                      movie={movie}
                      className='col-span-1'
                      trailer={() => {
                        setYoutubeUrl(
                          'https://www.youtube.com/watch?v=fnsWt4H619o'
                        );
                        setOpenVideoDialog(true);
                      }}
                    />
                  </motion.div>
                );
              })} */}
            {/* </div> */}
            {events?.length > 0 && (
              <div className='grid grid-cols-1 mt-4 overflow-hidden text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {events.map((event, index) => {
                  return (
                    <motion.div
                      key={index}
                      viewport={{ once: true }}
                      initial={{ opacity: 0, x: 200 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 0.5,
                        delay: 0.25 * index,
                        once: true,
                      }}
                      onClick={() => {
                        router.push('/event/' + event._id);
                      }}
                    >
                      <BookTicketButton
                        name={event.movie.title}
                        rating={'12A'}
                        theater={
                          event.theater.name + ', ' + event.theater.location
                        }
                        timing={event.date + ' @ ' + event.time}
                        url={'/event/' + event._id}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
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

  const data = tokenExpired
    ? []
    : await fetch(process.env.BASE_API_URL + 'movies', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => res.json())
        .then((json) => json);

  const events = await fetch(process.env.BASE_API_URL + 'event/all').then(
    (res) => res.json()
  );

  console.log(events);

  return { props: { data, tokenExpired, user, socialMedia, events } };
}
