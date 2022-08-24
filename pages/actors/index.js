import PageFrame from "../../components/PageFrame";
import { motion } from "framer-motion";
import Actor from "../../components/items/Actor";

export default function Actors({ data }) {
  return (
    <>
      <PageFrame page="actors">
        <div className=" max-w-7xl">
          <div className="h-64 p-4 bg-gradient-to-b from from-black to-transparent">
            <div className="flex justify-between">
              <div className="self-center flex-shrink-0 mb-4 text-4xl text-yellow-500 sm:mb-0 sm:mr-4">
                Actors
              </div>
              <div className="self-center px-4 py-2 text-yellow-500 border border-yellow-500 rounded-full h-max">
                Add
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 -mt-48 overflow-hidden sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5">
            {data.actors.map((cast, index) => {
              return (
                <motion.div
                  key={index}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    delay: 0.25 * index,
                    once: true,
                  }}
                >
                  <Actor actor={cast} />
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
  const data = await fetch(process.env.BASE_API_URL + "actors")
    .then((res) => res.json())
    .then((json) => json);

  console.log(data);

  return { props: { data } };
}
