import PageFrame from "../../components/PageFrame";
import { motion } from "framer-motion";
import Movie from "../../components/items/Movie";

export default function Actors({ data }) {
  return (
    <>
      <PageFrame page="movies">
        <div className=" max-w-7xl">
          <div className="h-64 p-4 bg-gradient-to-b from from-black to-transparent">
            <div className="flex justify-between">
              <div className="self-center flex-shrink-0 mb-4 text-4xl text-yellow-500 sm:mb-0 sm:mr-4">
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
  const data = await fetch(process.env.BASE_API_URL + "movies")
    .then((res) => res.json())
    .then((json) => json);

  console.log(data);

  return { props: { data } };
}
