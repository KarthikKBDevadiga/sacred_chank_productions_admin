import PageFrame from "../components/PageFrame";
import { motion } from "framer-motion";
import Movie from "../components/items/Movie";
import cookies from "next-cookies";
import AddIcon from "../icons/AddIcon";
import MovieIcon from "../icons/MovieIcon";

export default function Example({ data, user, tokenExpired, socialMedia }) {
  return (
    <>
      <PageFrame
        tokenExpired={tokenExpired}
        user={user}
        socialMedia={socialMedia}
      >
        {!tokenExpired && (
          <div className="max-w-6xl sm:px-6 lg:px-8">
            <div className="relative h-64 overflow-hidden bg-gray-700 rounded-md">
              <div className="flex justify-between px-4 py-3 bg-gray-800">
                <div className="self-center flex-shrink-0 mb-4 text-2xl text-white sm:mb-0 sm:mr-4">
                  Dashboard
                </div>
                {/* <div
                  className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                  onClick={() => {
                    router.push("/movies/add");
                  }}
                >
                  <AddIcon />
                </div> */}
              </div>
            </div>
            <div className="z-10 grid grid-cols-1 gap-4 p-4 -mt-48 overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="z-[1] bg-gray-500 aspect-square rounded-md shadow-md flex flex-col justify-center">
                <div className="self-center text-black text-9xl">
                  {data.moviesCount}
                </div>
                <div className="self-center text-4xl text-black">Movies</div>
              </div>
              <div className="z-[1] bg-gray-500 aspect-square rounded-md shadow-md flex flex-col justify-center">
                <div className="self-center text-black text-9xl">
                  {" "}
                  {data.actorsCount}
                </div>
                <div className="self-center text-4xl text-black">Actors</div>
              </div>
            </div>
          </div>
        )}
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
  const loginData = await fetch(process.env.BASE_API_URL + "users/logged", {
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

  const user = tokenExpired ? {} : loginData.user;
  const socialMedia = tokenExpired ? {} : loginData.socialMedia;

  console.log(user);

  const data = tokenExpired
    ? []
    : await fetch(process.env.BASE_API_URL + "home", {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => json);

  return { props: { data, tokenExpired, user, socialMedia } };
}
