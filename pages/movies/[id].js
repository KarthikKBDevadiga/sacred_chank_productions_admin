import PageFrame from "../../components/PageFrame";
import { motion } from "framer-motion";
import Actor from "../../components/items/Actor";
import cookies from "next-cookies";
import { data } from "autoprefixer";
import Image from "next/image";
import ImageLoader from "../../helpers/ImageLoader";
import classNames from "../../helpers/classNames";
import { useReducer, useState } from "react";
import genericValidator from "../../helpers/genericValidator";
import {
  SaveIcon,
  DeleteIcon,
  ActorIcon,
  PlayIcon,
  CloseIcon,
  AddIcon,
  EditIcon,
} from "../../icons/all";
import s3FileUpload from "../../helpers/s3FileUpload";
import moment from "moment";
import CustomDialog from "../../components/dialog/CustomDialog";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";
import getYoutubeVideoId from "../../helpers/getYoutubeVideoId";
import ActorSearchDialog from "../../components/dialog/ActorSearchDialog";
import { setRequestMeta } from "next/dist/server/request-meta";
import YoutubeDialog from "../../components/dialog/YoutubeDialog";
import AddVideoDialog from "../../components/dialog/AddVideoDialog";
import createKey from "../../helpers/createKey";
import { ActionCodeOperation } from "firebase/auth";
import BookTicketButton from "../../components/BookTicketButton";
import AddBookTicketButton from "../../components/AddBookTicketButton";
import AddTicketDialog from "../../components/dialog/AddTicketDialog";

const MOVIE_ACTIONS = {
  UPDATE_MOVIE_TITLE: "update_movie_title",
  UPDATE_MOVIE_DESCRIPTION: "update_movie_description",
  UPDATE_MOVIE_RELEASE_DATE: "update_movie_release_date",
  ADD_MOVIE_GENRE: "add_movie_genre",
  REMOVE_MOVIE_GENRE: "remove_movie_genre",
  ADD_MOVIE_LANGUAGE: "add_movie_language",
  REMOVE_MOVIE_LANGUAGE: "remove_movie_language",
  UPDATE_MOVIE_TRAILER: "update_movie_trailer",
  UPDATE_MOVIE_POSTER_LANDSCAPE: "update_movie_poster_landscape",
  UPDATE_MOVIE_POSTER_PORTRAIT: "update_movie_poster_portrait",
  REMOVE_MOVIE_CAST: "remove_movie_cast",
  ADD_MOVIE_CAST: "add_movie_cast",
  ADD_MOVIE_PROMOTION: "add_movie_promotion",
  REMOVE_MOVIE_PROMOTION: "remove_movie_promotion",
  ADD_MOVIE_REVIEW: "add_movie_review",
  REMOVE_MOVIE_REVIEW: "remove_movie_review",
  Add_MOVIE_TICKET: "add_movie_ticket",
  REMOVE_MOVIE_TICKET: "remove_movie_ticket",
  UPDATE_MOVIE_STATUS: "update_movie_status",
};

export default function UpdateMovie({
  genres,
  languages,
  statuses,
  savedMovie,
  user,
  socialMedia,
  tokenExpired,
  token,
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

  const reducer = (movie, action) => {
    switch (action.type) {
      case MOVIE_ACTIONS.UPDATE_MOVIE_TITLE:
        return {
          ...movie,
          title: action.payload.title,
        };
      case MOVIE_ACTIONS.UPDATE_MOVIE_DESCRIPTION:
        return {
          ...movie,
          description: action.payload.description,
        };
      case MOVIE_ACTIONS.UPDATE_MOVIE_RELEASE_DATE:
        return {
          ...movie,
          releaseDate: action.payload.releaseDate,
        };
      case MOVIE_ACTIONS.ADD_MOVIE_GENRE:
        return {
          ...movie,
          genres: [...movie.genres, action.payload.genre],
        };
      case MOVIE_ACTIONS.REMOVE_MOVIE_GENRE:
        return {
          ...movie,
          genres: movie.genres.filter((genre) => genre != action.payload.genre),
        };
      case MOVIE_ACTIONS.ADD_MOVIE_LANGUAGE:
        return {
          ...movie,
          languages: [...movie.languages, action.payload.language],
        };
      case MOVIE_ACTIONS.REMOVE_MOVIE_LANGUAGE:
        return {
          ...movie,
          languages: movie.languages.filter(
            (language) => language != action.payload.language
          ),
        };
      case MOVIE_ACTIONS.UPDATE_MOVIE_TRAILER:
        return {
          ...movie,
          trailer: action.payload.trailer,
        };
      case MOVIE_ACTIONS.UPDATE_MOVIE_POSTER_LANDSCAPE:
        return {
          ...movie,
          poster: {
            ...movie.poster,
            landscape: action.payload.landscape,
          },
        };
      case MOVIE_ACTIONS.UPDATE_MOVIE_POSTER_PORTRAIT:
        return {
          ...movie,
          poster: {
            ...movie.poster,
            portrait: action.payload.portrait,
          },
        };
      case MOVIE_ACTIONS.REMOVE_MOVIE_CAST:
        return {
          ...movie,
          casts: movie.casts.filter(
            (cast) => cast._id != action.payload.castId
          ),
        };
      case MOVIE_ACTIONS.ADD_MOVIE_CAST:
        const already = movie.casts.find(
          (cast) => cast._id == action.payload.actor._id
        );
        if (already != null) return movie;
        return {
          ...movie,
          casts: [...movie.casts, action.payload.actor],
        };
      case MOVIE_ACTIONS.ADD_MOVIE_PROMOTION:
        return {
          ...movie,
          promotions: [
            ...movie.promotions,
            {
              _id: createKey(),
              title: action.payload.title,
              url: action.payload.url,
            },
          ],
        };
      case MOVIE_ACTIONS.REMOVE_MOVIE_PROMOTION:
        return {
          ...movie,
          promotions: movie.promotions.filter(
            (promotion) => promotion._id != action.payload.promotionId
          ),
        };
      case MOVIE_ACTIONS.ADD_MOVIE_REVIEW:
        return {
          ...movie,
          reviews: [
            ...movie.reviews,
            {
              _id: createKey(),
              title: action.payload.title,
              url: action.payload.url,
            },
          ],
        };
      case MOVIE_ACTIONS.REMOVE_MOVIE_REVIEW:
        return {
          ...movie,
          reviews: movie.reviews.filter(
            (review) => review._id != action.payload.reviewId
          ),
        };
      case MOVIE_ACTIONS.Add_MOVIE_TICKET:
        return {
          ...movie,
          tickets: [
            ...movie.tickets,
            {
              _id: createKey(),
              rating: action.payload.rating,
              timing: action.payload.timing,
              theater: action.payload.theater,
              url: action.payload.url,
            },
          ],
        };
      case MOVIE_ACTIONS.REMOVE_MOVIE_TICKET:
        console.log(action);
        return {
          ...movie,
          tickets: movie.tickets.filter(
            (ticket) => ticket._id != action.payload.ticketId
          ),
        };
      case MOVIE_ACTIONS.UPDATE_MOVIE_STATUS:
        return {
          ...movie,
          status: action.payload.status,
        };
      default:
        return movie;
    }
  };

  const [movie, dispatch] = useReducer(reducer, savedMovie);

  const uploadPortraitPoster = async (file) => {
    setLoadingDialog(true);
    const data = await s3FileUpload(file, "films/images");
    console.log(data);
    dispatch({
      type: MOVIE_ACTIONS.UPDATE_MOVIE_POSTER_PORTRAIT,
      payload: {
        portrait: data.url,
      },
    });
    setLoadingDialog(false);
  };

  const uploadLandscapePoster = async (file) => {
    setLoadingDialog(true);
    const data = await s3FileUpload(file, "films/images");
    console.log(data);
    dispatch({
      type: MOVIE_ACTIONS.UPDATE_MOVIE_POSTER_LANDSCAPE,
      payload: {
        landscape: data.url,
      },
    });
    setLoadingDialog(false);
  };

  const saveMovie = () => {
    let isValid = true;
    if (isValid) {
      setLoadingDialog(true);
      console.log(movie);
      const body = {
        ...movie,
        casts: movie.casts.map((cast) => cast._id),
        tickets: movie.tickets.map((ticket) => {
          return {
            rating: ticket.rating,
            timing: ticket.timing,
            theater: ticket.theater,
            url: ticket.url,
          };
        }),
      };
      console.log(body);
      let status = 200;
      fetch(process.env.BASE_API_URL + "movies/" + movie._id, {
        method: "put",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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
            setDialogTitle("Successful!");
            setDialogDescription("Movie Data Updated Successfully");
          } else {
            console.log(json);
          }
        })
        .catch((err) => {
          // setLoadingDialog(false);
          console.log(err);
        });
    }
  };
  const deleteMovie = () => {
    setLoadingDialog(true);
    const status = 200;
    fetch(process.env.BASE_API_URL + "movies/" + movie._id, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setLoadingDialog(false);
        status = res.status;
        return res.json();
      })
      .then((json) => {
        if (status == 200) {
          setShowDialog(true);
          setDialogTitle("Successful!");
          setDialogDescription("Movie Data Deleted Successfully");
        } else {
        }
      })
      .catch((err) => {
        // setLoadingDialog(false);
        console.log(err);
      });
  };
  return (
    <>
      <PageFrame
        title={movie.title}
        page="movies"
        user={user}
        socialMedia={socialMedia}
        tokenExpired={tokenExpired}
        loadingDialog={loadingDialog}
        setLoadingDialog={setLoadingDialog}
      >
        {!tokenExpired && (
          <>
            <div className="max-w-6xl px-4 overflow-hidden sm:px-6 lg:px-8">
              <div className="grid max-w-3xl grid-cols-1 gap-4 mx-auto lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <motion.div
                  className="overflow-hidden bg-gray-700 rounded-md shadow-md lg:col-start-1 lg:col-span-2"
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -200 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    once: true,
                  }}
                >
                  <div className="px-4 py-3 text-lg font-bold text-white bg-gray-800">
                    Update
                  </div>
                  <div className="p-4">
                    <div className="gap-4 md:flex">
                      <label
                        htmlFor="portrait"
                        className="md:w-1/3 h-full aspect-[2/3] shadow-md rounded-md overflow-hidden relative group cursor-pointer"
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={movie.poster?.portrait}
                            className="object-cover w-full h-full "
                          />
                          <div className="absolute top-0 flex flex-col justify-end w-full h-full overflow-hidden duration-500 rounded-md cursor-pointer group-hover:bg-black/50">
                            <div className="py-3 font-bold text-center text-white duration-500 translate-y-full bg-black group-hover:translate-y-0">
                              Upload
                            </div>
                          </div>
                        </div>
                        <input
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file != null) uploadPortraitPoster(file);
                          }}
                          accept="image/png, image/jpeg"
                          // onFocus={() => setImageError()}
                          id="portrait"
                          name="portrait"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <label
                        htmlFor="landscape"
                        className="md:flex-1 mt-4 md:mt-0 w-full h-full aspect-[3/2] shadow-md rounded-md overflow-hidden relative group"
                      >
                        <div className="relative w-full h-full group">
                          <img
                            src={movie.poster?.landscape}
                            className="object-cover w-full h-full "
                          />
                          <div className="absolute top-0 flex flex-col justify-end w-full h-full overflow-hidden duration-500 rounded-md cursor-pointer group-hover:bg-black/50">
                            <div className="py-3 font-bold text-center text-white duration-500 translate-y-full bg-black group-hover:translate-y-0">
                              Upload
                            </div>
                          </div>
                        </div>
                        <input
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file != null) uploadLandscapePoster(file);
                          }}
                          accept="image/png, image/jpeg"
                          // onFocus={() => setImageError()}
                          id="landscape"
                          name="landscape"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>

                    <div
                      className={classNames("relative w-full  col-span-2 mt-4")}
                    >
                      <input
                        // ref={emailRef}
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          "placeholder-shown:border-gray-500 focus:border-gray-100 border-gray-600"
                        )}
                        defaultValue={movie.title}
                        name={"title"}
                        id={"title"}
                        type="title"
                        placeholder="Title"
                        onChange={(event) => {
                          dispatch({
                            type: MOVIE_ACTIONS.UPDATE_MOVIE_TITLE,
                            payload: {
                              title: event.target.value,
                            },
                          });
                        }}
                        // onFocus={() => setEmailError()}
                      />

                      <label
                        htmlFor={"title"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                        )}
                      >
                        Title
                      </label>
                    </div>

                    <div
                      className={classNames("relative w-full  col-span-2 mt-4")}
                    >
                      <TextareaAutosize
                        // ref={emailRef}
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                        )}
                        defaultValue={movie.description}
                        name={"description"}
                        id={"description"}
                        type="description"
                        placeholder="Description"
                        onChange={(event) => {
                          dispatch({
                            type: MOVIE_ACTIONS.UPDATE_MOVIE_DESCRIPTION,
                            payload: {
                              description: event.target.value,
                            },
                          });
                        }}
                        // onFocus={() => setEmailError()}
                      />

                      <label
                        htmlFor={"description"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                        )}
                      >
                        Description
                      </label>
                    </div>

                    <div
                      className={classNames("relative w-full  col-span-2 mt-4")}
                    >
                      <input
                        // ref={emailRef}
                        className={classNames(
                          "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                          "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                        )}
                        name={"release_date"}
                        id={"release_date"}
                        type="text"
                        placeholder="Release Date"
                        onChange={(event) => {
                          dispatch({
                            type: MOVIE_ACTIONS.UPDATE_MOVIE_RELEASE_DATE,
                            payload: {
                              releaseDate: event.target.value,
                            },
                          });
                        }}
                        defaultValue={movie.releaseDate}
                        // onFocus={() => setEmailError()}
                      />

                      <label
                        htmlFor={"release_date"}
                        className={classNames(
                          "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                          " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                          "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                          "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                        )}
                      >
                        Release Date
                      </label>
                    </div>

                    <div className="mt-4 md:flex md:itsems-center md:justify-between">
                      <div className="flex-1 min-w-0">
                        <div className={classNames("relative w-full")}>
                          <input
                            // ref={emailRef}
                            className={classNames(
                              "w-full py-2  text-sm text-white duration-200 bg-transparent border-2 pl-4 rounded-md outline-none focus:border-2 placeholder:text-transparent peer ",
                              "placeholder-shown:border-gray-500 focus:border-gray-100  border-gray-600"
                            )}
                            name={"trailer_video"}
                            id={"trailer_video"}
                            type="text"
                            placeholder="Trailer Video"
                            defaultValue={movie.trailer}
                            onChange={(event) => {
                              dispatch({
                                type: MOVIE_ACTIONS.UPDATE_MOVIE_TRAILER,
                                payload: {
                                  trailer: event.target.value,
                                },
                              });
                            }}
                            // onFocus={() => setEmailError()}
                          />

                          <label
                            htmlFor={"trailer_video"}
                            className={classNames(
                              "absolute block px-2 text-xs duration-200 bg-gray-700  -top-2 left-4",
                              " peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-gray-700 peer-focus:text-xs",
                              "peer-placeholder-shown:top-2 peer-placeholder-shown:left-2 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent",
                              "peer-placeholder-shown:text-gray-500 peer-focus:text-white text-gray-500"
                            )}
                          >
                            Trailer Video
                          </label>
                        </div>
                      </div>
                      <div className="flex mt-4 md:mt-0 md:ml-4">
                        <div className="relative justify-center w-full h-full max-w-full overflow-hidden bg-black rounded-md cursor-pointer group md:w-64">
                          <img
                            className="object-cover w-full duration-500 group-hover:scale-125 grayscale group-hover:grayscale-0"
                            src={
                              "https://img.youtube.com/vi/" +
                              getYoutubeVideoId(movie.trailer) +
                              "/hqdefault.jpg"
                            }
                          />
                          <div className="absolute top-0 left-0 flex justify-center w-full h-full">
                            <PlayIcon className="self-center w-16 h-16 text-gray-700 " />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-500">Genres</div>
                      <div className="flex flex-wrap gap-2 mt-2 ">
                        {genres.map((genre) => (
                          <div
                            key={genre}
                            className={classNames(
                              "px-3 py-1 text-xs font-bold duration-500 border border-white rounded-full hover:bg-white hover:text-gray-700 cursor-pointer",
                              movie.genres.includes(genre)
                                ? "bg-white text-gray-700"
                                : " text-white "
                            )}
                            onClick={() => {
                              dispatch({
                                type: movie.genres.includes(genre)
                                  ? MOVIE_ACTIONS.REMOVE_MOVIE_GENRE
                                  : MOVIE_ACTIONS.ADD_MOVIE_GENRE,
                                payload: {
                                  genre: genre,
                                },
                              });
                            }}
                          >
                            {genre}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-500">Languages</div>
                      <div className="flex flex-wrap gap-2 mt-2 ">
                        {languages.map((language) => (
                          <div
                            key={language}
                            className={classNames(
                              "px-3 py-1 text-xs font-bold duration-500 border border-white rounded-full hover:bg-white hover:text-gray-700 cursor-pointer",
                              movie.languages.includes(language)
                                ? "bg-white text-gray-700"
                                : " text-white "
                            )}
                            onClick={() => {
                              dispatch({
                                type: movie.languages.includes(language)
                                  ? MOVIE_ACTIONS.REMOVE_MOVIE_LANGUAGE
                                  : MOVIE_ACTIONS.ADD_MOVIE_LANGUAGE,
                                payload: {
                                  language: language,
                                },
                              });
                            }}
                          >
                            {language}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-gray-500">Casts</div>
                      <div className="flex flex-wrap gap-2 mt-2 ">
                        <div className="grid w-full grid-cols-4 gap-4 sm:grid-cols-4 lg:grid-cols-4">
                          {movie.casts?.map((cast, index) => {
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
                                <div className="relative overflow-hidden rounded-md shadow-md cursor-pointer aspect-square group">
                                  <img
                                    className="object-cover w-full h-full duration-500 group-hover:grayscale group-hover:scale-150 group-hover:translate-x-1/4"
                                    src={cast.image}
                                  />
                                  <div className="absolute text-base md:text-lg top-2 left-2">
                                    <div className="text-white duration-500 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                                      {cast.name}
                                    </div>
                                  </div>
                                  <div
                                    className="absolute text-base duration-500 translate-x-full opacity-0 md:text-lg bottom-2 right-2 group-hover:translate-x-0 group-hover:opacity-100"
                                    onClick={() => {
                                      dispatch({
                                        type: MOVIE_ACTIONS.REMOVE_MOVIE_CAST,
                                        payload: {
                                          castId: cast._id,
                                        },
                                      });
                                    }}
                                  >
                                    <CloseIcon className="w-8 h-8 p-1 text-white duration-500 bg-gray-500 bg-opacity-25 rounded-full hover:bg-opacity-100" />
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                          <motion.div
                            className="flex flex-col justify-center gap-2 duration-500 bg-white border border-white border-dashed rounded-md cursor-pointer aspect-square bg-opacity-10 hover:bg-opacity-25"
                            viewport={{ once: true }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              ease: "easeInOut",
                              duration: 0.5,
                              once: true,
                            }}
                            onClick={() => setSearchDialog(true)}
                          >
                            <AddIcon className="self-center text-white" />
                            <div className="self-center text-white cursor-pointer">
                              ADD CAST
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-500">Promotions</div>
                      <div className="flex flex-wrap gap-2 mt-2 ">
                        <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-3">
                          {movie.promotions?.map((promotion, index) => {
                            return (
                              <motion.div
                                key={index}
                                className="relative overflow-hidden rounded-md shadow-md cursor-pointer group aspect-video"
                                onClick={() => {
                                  setYoutubeUrl(promotion.url);
                                  setOpenVideoDialog(true);
                                }}
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
                                <img
                                  src={
                                    "https://img.youtube.com/vi/" +
                                    getYoutubeVideoId(promotion.url) +
                                    "/hqdefault.jpg"
                                  }
                                  className="object-cover w-full h-full duration-500 group-hover:blur-sm"
                                  frameBorder="0"
                                  allowFullScreen
                                />
                                <div className="absolute left-0 w-full duration-500 bg-black bg-opacity-50 h-1/2 -top-full group-hover:top-0 "></div>
                                <div className="absolute left-0 w-full duration-500 bg-black bg-opacity-50 h-1/2 -bottom-full group-hover:bottom-0"></div>
                                <div className="absolute text-white duration-500 scale-0 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-100 top-1/2 left-1/2">
                                  <PlayIcon className="w-12 h-12" />
                                </div>
                                <div
                                  className="absolute text-base duration-500 -translate-x-full opacity-0 md:text-lg bottom-2 left-2 group-hover:translate-x-0 group-hover:opacity-100"
                                  onClick={() => {
                                    // dispatch({
                                    //   type: MOVIE_ACTIONS.REMOVE_MOVIE_CAST,
                                    //   payload: {
                                    //     castId: cast._id,
                                    //   },
                                    // });
                                  }}
                                >
                                  <EditIcon className="w-8 h-8 p-1 text-white duration-500 bg-gray-500 bg-opacity-25 rounded-full hover:bg-opacity-100" />
                                </div>
                                <div
                                  className="absolute text-base duration-500 translate-x-full opacity-0 md:text-lg bottom-2 right-2 group-hover:translate-x-0 group-hover:opacity-100"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    dispatch({
                                      type: MOVIE_ACTIONS.REMOVE_MOVIE_PROMOTION,
                                      payload: {
                                        promotionId: promotion._id,
                                      },
                                    });
                                  }}
                                >
                                  <CloseIcon className="w-8 h-8 p-1 text-white duration-500 bg-gray-500 bg-opacity-25 rounded-full hover:bg-opacity-100" />
                                </div>
                                <div className="absolute text-base text-white duration-500 -left-full top-2 group-hover:left-2">
                                  {promotion.title}
                                </div>
                              </motion.div>
                            );
                          })}
                          <motion.div
                            className="flex flex-col justify-center gap-2 duration-500 bg-white border border-white border-dashed rounded-md cursor-pointer aspect-video bg-opacity-10 hover:bg-opacity-25"
                            viewport={{ once: true }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              ease: "easeInOut",
                              duration: 0.5,
                              once: true,
                            }}
                            onClick={() => {
                              setVideoDialogType("PROMOTION");
                              setAddVideoDialog(true);
                            }}
                          >
                            <AddIcon className="self-center text-white" />
                            <div className="self-center text-white cursor-pointer">
                              ADD PROMOTIONS
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-gray-500">Review</div>
                      <div className="flex flex-wrap gap-2 mt-2 ">
                        <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-3">
                          {movie.reviews?.map((review, index) => {
                            return (
                              <motion.div
                                key={index}
                                className="relative overflow-hidden rounded-md shadow-md cursor-pointer group aspect-video"
                                onClick={() => {
                                  setYoutubeUrl(review.url);
                                  setOpenVideoDialog(true);
                                }}
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
                                <img
                                  src={
                                    "https://img.youtube.com/vi/" +
                                    getYoutubeVideoId(review.url) +
                                    "/hqdefault.jpg"
                                  }
                                  className="object-cover w-full h-full duration-500 group-hover:blur-sm"
                                  frameBorder="0"
                                  allowFullScreen
                                />
                                <div className="absolute left-0 w-full duration-500 bg-black bg-opacity-50 h-1/2 -top-full group-hover:top-0 "></div>
                                <div className="absolute left-0 w-full duration-500 bg-black bg-opacity-50 h-1/2 -bottom-full group-hover:bottom-0"></div>
                                <div className="absolute text-white duration-500 scale-0 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-100 top-1/2 left-1/2">
                                  <PlayIcon className="w-16 h-16" />
                                </div>
                                <div
                                  className="absolute text-base duration-500 -translate-x-full opacity-0 md:text-lg bottom-2 left-2 group-hover:translate-x-0 group-hover:opacity-100"
                                  onClick={() => {
                                    // dispatch({
                                    //   type: MOVIE_ACTIONS.REMOVE_MOVIE_CAST,
                                    //   payload: {
                                    //     castId: cast._id,
                                    //   },
                                    // });
                                  }}
                                >
                                  <EditIcon className="w-8 h-8 p-1 text-white duration-500 bg-gray-500 bg-opacity-25 rounded-full hover:bg-opacity-100" />
                                </div>
                                <div
                                  className="absolute text-base duration-500 translate-x-full opacity-0 md:text-lg bottom-2 right-2 group-hover:translate-x-0 group-hover:opacity-100"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    dispatch({
                                      type: MOVIE_ACTIONS.REMOVE_MOVIE_REVIEW,
                                      payload: {
                                        reviewId: review._id,
                                      },
                                    });
                                  }}
                                >
                                  <CloseIcon className="w-8 h-8 p-1 text-white duration-500 bg-gray-500 bg-opacity-25 rounded-full hover:bg-opacity-100" />
                                </div>
                                <div className="absolute text-base text-white duration-500 -left-full top-2 group-hover:left-2">
                                  {review.title}
                                </div>
                              </motion.div>
                            );
                          })}

                          <motion.div
                            className="flex flex-col justify-center w-full h-full col-span-1 gap-2 duration-500 bg-white border border-white border-dashed rounded-md cursor-pointer aspect-video bg-opacity-10 hover:bg-opacity-25"
                            viewport={{ once: true }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              ease: "easeInOut",
                              duration: 0.5,
                              once: true,
                            }}
                            onClick={() => {
                              setVideoDialogType("REVIEW");
                              setAddVideoDialog(true);
                            }}
                          >
                            <AddIcon className="self-center text-white" />
                            <div className="self-center text-white cursor-pointer">
                              ADD REVIEWS
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-gray-500">Ticket</div>
                      <div className="grid w-full grid-cols-1 mt-4 overflow-hidden text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
                        {movie.tickets?.map((ticket, index) => {
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
                              <BookTicketButton
                                name={movie.title}
                                rating={ticket.rating}
                                theater={ticket.theater}
                                timing={ticket.timing}
                                url={ticket.url}
                                onRemove={() => {
                                  dispatch({
                                    type: MOVIE_ACTIONS.REMOVE_MOVIE_TICKET,
                                    payload: {
                                      ticketId: ticket._id,
                                    },
                                  });
                                }}
                              />
                              {/* <div
                            className="absolute top-0 right-0 p-1 text-black duration-500 bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100"
                            onClick={() => {
                              dispatch({
                                type: MOVIE_ACTIONS.REMOVE_MOVIE_TICKET,
                                payload: {
                                  ticketId: ticket.id,
                                },
                              });
                            }}
                          >
                            <CloseIcon />
                          </div> */}
                            </motion.div>
                          );
                        })}
                        <AddBookTicketButton
                          name={movie.title}
                          onClick={() => {
                            setAddTicketDialog(true);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="flex flex-wrap gap-2 mt-2 ">
                        {statuses.map((status) => (
                          <div
                            key={status}
                            className={classNames(
                              "px-3 py-1 text-xs font-bold duration-500 border border-white rounded-full hover:bg-white hover:text-gray-700 cursor-pointer",
                              movie.status == status
                                ? "bg-white text-gray-700"
                                : " text-white "
                            )}
                            onClick={() => {
                              dispatch({
                                type: MOVIE_ACTIONS.UPDATE_MOVIE_STATUS,
                                payload: {
                                  status: status,
                                },
                              });
                            }}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 px-4 py-3 bg-gray-800">
                    <div
                      className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                      onClick={() => {
                        deleteMovie();
                      }}
                    >
                      <DeleteIcon />
                    </div>
                    <div
                      className="p-2 text-white duration-500 rounded-full cursor-pointer w-max hover:bg-gray-600"
                      onClick={() => {
                        saveMovie();
                      }}
                    >
                      <SaveIcon />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="overflow-hidden bg-gray-700 rounded-md shadow-md lg:col-start-3 lg:col-span-1 h-max"
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                    once: true,
                  }}
                >
                  <div className="px-4 py-3 text-lg font-bold text-white bg-gray-800">
                    Details
                  </div>
                  <div className="px-4 pt-4 pb-2">
                    <div className="self-center text-xs font-normal text-gray-500 text-medium">
                      Created On
                    </div>
                    <div className="self-center text-base font-normal text-white text-medium">
                      {moment(movie.createdAt)
                        .utcOffset("+05:30")
                        .format("hh:mm a, DD MMMM, YYYY")}
                    </div>
                  </div>
                  <div className="px-4 pt-2 pb-4">
                    <div className="self-center text-xs font-normal text-gray-500 text-medium">
                      Updated On
                    </div>
                    <div className="self-center text-base font-normal text-white text-medium">
                      {moment(movie.updatedAt)
                        .utcOffset("+05:30")
                        .format("hh:mm a, DD MMMM, YYYY")}
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
                router.back();
              }}
            />
            <ActorSearchDialog
              showDialog={searchDialog}
              setShowDialog={setSearchDialog}
              active={movie.casts}
              selectedActor={(actor) => {
                dispatch({
                  type: MOVIE_ACTIONS.ADD_MOVIE_CAST,
                  payload: {
                    actor: actor,
                  },
                });
              }}
            />
            <YoutubeDialog
              url={youtubeUrl}
              showDialog={openVideoDialog}
              setShowDialog={setOpenVideoDialog}
            />
            <AddVideoDialog
              showDialog={addVideoDialog}
              setShowDialog={setAddVideoDialog}
              onData={(name, videoUrl) => {
                console.log(name + " " + videoUrl);

                dispatch({
                  type:
                    videoDialogType == "PROMOTION"
                      ? MOVIE_ACTIONS.ADD_MOVIE_PROMOTION
                      : MOVIE_ACTIONS.ADD_MOVIE_REVIEW,
                  payload: {
                    title: name,
                    url: videoUrl,
                  },
                });
              }}
            />
            <AddTicketDialog
              showDialog={addTicketDialog}
              setShowDialog={setAddTicketDialog}
              onData={(rating, timing, theater, url) => {
                dispatch({
                  type: MOVIE_ACTIONS.Add_MOVIE_TICKET,
                  payload: {
                    rating,
                    timing,
                    theater,
                    url,
                  },
                });
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

  const genres = tokenExpired
    ? []
    : await fetch(process.env.BASE_API_URL + "genres", {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => json);
  const languages = tokenExpired
    ? []
    : await fetch(process.env.BASE_API_URL + "languages", {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => json);
  const statuses = tokenExpired
    ? []
    : await fetch(process.env.BASE_API_URL + "movieStatus", {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => json);

  const savedMovie = tokenExpired
    ? {}
    : await fetch(
        process.env.BASE_API_URL + "movies/canonical/" + context.params.id,
        {
          method: "get",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => res.json())
        .then((json) => json.movie);

  console.log(savedMovie);

  return {
    props: {
      genres,
      languages,
      statuses,
      savedMovie,
      token,
      tokenExpired,
      user,
      socialMedia,
    },
  };
}
