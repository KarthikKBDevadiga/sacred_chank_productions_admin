import PageFrame from "../../components/PageFrame";
import { motion } from "framer-motion";
import Movie from "../../components/items/Movie";
import cookies from "next-cookies";

export default function Movies({ data, user, tokenExpired }) {
  return (
    <>
      <PageFrame page="movies" user={user} tokenExpired={tokenExpired}>
        <div className="max-w-6xl sm:px-6 lg:px-8">
          {/* <div className="h-48 film">
            <div className="film__frame"></div>
          </div> */}
          <div className="relative h-64 p-4 bg-black rounded-md ">
            <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
              <div className="self-center flex-shrink-0 mb-4 text-4xl text-white sm:mb-0 sm:mr-4">
                Movies
              </div>
              <div className="self-center px-4 py-2 text-yellow-500 border border-yellow-500 rounded-full h-max">
                Add
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 p-4 -mt-48 overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.movies.map((movie, index) => {
              return (
                <motion.div
                  key={index}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: 200 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    delay: 0.25 * index,
                    once: true,
                  }}
                >
                  <Movie
                    key={movie}
                    movie={movie}
                    className="col-span-1"
                    trailer={() => {
                      setYoutubeUrl(
                        "https://www.youtube.com/watch?v=fnsWt4H619o"
                      );
                      setOpenVideoDialog(true);
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </PageFrame>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = cookies(context);

  if (token == null || token == "") {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  let tokenExpired;
  const user = await fetch(process.env.BASE_API_URL + "users/logged", {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
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

  const data = tokenExpired
    ? []
    : await fetch(process.env.BASE_API_URL + "movies", {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => json);

  return { props: { data, tokenExpired, user } };
}
