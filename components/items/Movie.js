import { useRouter } from "next/router";
import classNames from "../../helpers/classNames";
import TrailerButton from "../TrailerButton";

const Movie = ({ movie, trailer, className }) => {
  const router = useRouter();
  return (
    <div
      className={classNames(
        "relative overflow-hidden aspect-[2/3] rounded-md shadow-md cursor-pointer group ",
        className
      )}
      onClick={() => {
        router.push("/movies/" + movie.canonical);
      }}
    >
      <img
        className="object-cover w-full h-full duration-500 group-hover:grayscale-0 grayscale group-hover:scale-110 group-hover:-translate-y-8"
        src={movie.poster.portrait}
      />
      <div className="absolute bottom-0 w-full p-4 text-white duration-500 translate-y-full bg-gradient-to-t from-black via-black to-transparent group-hover:translate-y-0">
        <div className="text-lg font-bold text-white">{movie.title}</div>

        <div className="flex gap-2 mt-2">
          {movie.genres.map((genre, index) => {
            return (
              <div
                key={index}
                className="px-1.5 py-0.5 text-xs bg-red-600 rounded-md "
              >
                {genre}
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-sm text-justify">{movie.description}</div>
        <div className="mt-2">
          <div className="flex gap-2 text-base text-white">
            <div>Cast</div>
            <div className="self-center flex-1 h-px bg-white rounded-sm" />
          </div>
          <div className="flex gap-2 mt-2">
            {movie.casts.map((cast, index) => {
              return (
                <img
                  key={index}
                  className="object-cover w-10 h-10 rounded-full"
                  src={cast.image}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute flex gap-2 top-2 right-2">
        {movie.languages.map((language, index) => {
          return (
            <div
              key={index}
              data-tooltip={"Language"}
              data-tooltip-location="bottom"
              className="h-6 px-2 py-1 text-xs font-bold text-red-700 align-middle bg-yellow-500 rounded-md border-21 border-red-9001 bg-amber-5001"
            >
              {language}
            </div>
          );
        })}
        <TrailerButton
          onClick={(event) => {
            event.stopPropagation();

            trailer();
          }}
        />
      </div>
      <div className="absolute flex justify-center h-6 gap-2 px-2 bg-black border-2 border-black rounded-md top-2 left-2">
        <div className="self-center text-sm font-bold text-white ">U/A</div>
      </div>
      {/* <div className="absolute top-0 w-full p-4 text-white duration-500 -translate-y-full bg-black bg-opacity-50 group-hover:translate-y-0">
        {movie.releaseDate}
      </div> */}
    </div>
  );
};
export default Movie;
