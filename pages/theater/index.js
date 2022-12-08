import PageFrame from "../../components/PageFrame";
import { motion, useScroll } from "framer-motion";
import Movie from "../../components/items/Movie";
import cookies from "next-cookies";
import AddIcon from "../../icons/AddIcon";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Movies({ data, user, tokenExpired, socialMedia }) {
  const router = useRouter();
  const [layout, setLayout] = useState([]);
  return (
    <>
      <PageFrame
        page="theater"
        user={user}
        tokenExpired={tokenExpired}
        socialMedia={socialMedia}
      >
        {!tokenExpired && (
          <div className="max-w-6xl sm:px-6 lg:px-8">
            <div className="relative h-64 overflow-hidden bg-gray-700 rounded-md">
              <div className="flex justify-between px-4 py-3 bg-gray-800">
                <div className="self-center flex-shrink-0 mb-4 text-2xl text-white sm:mb-0 sm:mr-4">
                  Movies
                </div>
                <div
                  className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                  onClick={() => {
                    router.push("/movies/add");
                  }}
                >
                  <AddIcon />
                </div>
              </div>
            </div>
            <div className="gap-4 p-4 overflow-hidden ">
              <div className="flex flex-col gap-4">
                {layout.map((block, blockIndex) => {
                  return (
                    <div
                      key={blockIndex}
                      className="border border-white border-dashed rounded-md"
                    >
                      <div className="flex flex-col gap-2 m-2">
                        {block.rows &&
                          block.rows.length > 0 &&
                          block.rows.map((row, rowIndex) => {
                            return (
                              <div
                                key={rowIndex}
                                className="flex px-2 py-1 text-white border border-white border-dashed rounded-md"
                              >
                                <div className="flex flex-1 gap-2">
                                  {row.map((seat, seatIndex) => {
                                    return (
                                      <div
                                        key={seatIndex}
                                        className="flex items-center justify-center w-6 h-6 text-xs text-yellow-500 duration-500 border border-yellow-500 rounded-sm hover:bg-yellow-600 hover:border-yellow-600 "
                                      >
                                        {seatIndex}
                                      </div>
                                    );
                                  })}
                                </div>
                                <div
                                  className="px-1"
                                  onClick={() => {
                                    const temp = layout.map((b, i) => {
                                      if (i == blockIndex) {
                                        return {
                                          ...b,
                                          rows: b.rows.map((r, j) => {
                                            if (j == rowIndex) {
                                              const row = r.map((a) => a);
                                              row.push({});
                                              return row;
                                            } else return r;
                                          }),
                                        };
                                        // return b.rows.map((r, j) => {
                                        //   if (j == rowIndex) {
                                        //     const row = r.map((a) => a);
                                        //     row.push({});
                                        //     return row;
                                        //   } else return r;
                                        // });
                                        // const br = b.rows.map((r) => r);
                                        // br.push([]);
                                        // return {
                                        //   rows: br,
                                        // };
                                      } else return b;
                                    });
                                    setLayout(temp);
                                  }}
                                >
                                  +
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div
                        className="px-2 py-1 mt-4 text-xs font-bold text-black bg-white border border-white rounded-md shadow-md cursor-pointer w-max"
                        onClick={() => {
                          const temp = layout.map((b, i) => {
                            if (i == blockIndex) {
                              const br = b.rows.map((r) => r);
                              br.push([]);
                              return {
                                rows: br,
                              };
                            } else return b;
                          });
                          setLayout(temp);
                        }}
                      >
                        ADD ROW
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="px-2 py-1 mt-4 text-xs font-bold text-black bg-white border border-white rounded-md shadow-md cursor-pointer w-max"
                onClick={() => {
                  const temp = layout.map((b) => b);
                  temp.push({ rows: [] });
                  setLayout(temp);
                  console.log(temp);
                }}
              >
                ADD BLOCK
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

  return { props: { data, tokenExpired, user, socialMedia } };
}
