import { Movie } from "../types";

const genres = new Map([
  [16, "Animationtion"],
  [28, "Action"],
  [18, "Drama"],
  [27, "Horror"],
]);

const baseUrl = "https://image.tmdb.org/t/p/";
const size = "w500";
interface Props {
  selectedMovie: Movie | null;
  toggle: boolean;
  onToggleClick: () => void;
}

const DetailModal: React.FC<Props> = ({
  toggle,
  selectedMovie: movie,
  onToggleClick,
}) => {
  if (!toggle || !movie) return null;

  const { id, title, overview, poster_path, genre_ids, release_date } = movie;

  const genreNames = genre_ids
    .filter((id) => genres.has(id))
    .map((id) => genres.get(id));

  const handleCloseModalClick = (e: React.MouseEvent) => {
    if (e.target && (e.target as HTMLElement).id === "modal-overlay") {
      onToggleClick();
    }
  };

  return (
    <>
      <div
        id="modal-overlay"
        className="bg-gray-500 fixed inset-0 z-20 bg-opacity-70"
        onClick={handleCloseModalClick}
      ></div>
      <div
        className="fixed top-0 sm:top-20 sm:left-1/2 sm:transform sm:-translate-x-1/2 
         flex flex-col sm:mx-20 z-30 bg-white
         overflow-y-auto max-w-[400px] h-[700px] max-h-[900px] py-4 scroll-smooth"
        role="dialog"
        aria-labelledby="dialog-title"
      >
        <div className="absolute top-2 right-2 p-2">
          <button
            className="hover:bg-blue-300 rounded-3xl font-bold text-lg z-25 px-2"
            onClick={onToggleClick}
          >
            X
          </button>
        </div>
        <div className="">
          <h1 className="text-xl font-normal pb-3" id="dialog-title">
            Movie Details
          </h1>
          <hr />
        </div>
        <div className="flex flex-col items-center py-4 px-6" key={id}>
          <li className="list-none" key={id}>
            <div className="flex justify-center p-1">
              <img
                className="max-w-full h-[350px] object-cover p-2 m-2"
                src={`${baseUrl}${size}${poster_path}`}
                alt={title}
              />
            </div>
            <div className="inline-block text-left h-10 font-semibold text-2xl">
              <span>{title}</span>
            </div>
            <div className="text-left p-1 text-sm text-gray-500">
              <span>Released: {release_date}</span>
            </div>
            <div className="flex flex-wrap">
              {genreNames.map((item) => (
                <ul>
                  <li
                    key={item}
                    className="font-bold border-2 border-blue-600 rounded-xl px-2 m-1 inline-block"
                  >
                    {item}
                  </li>
                </ul>
              ))}
            </div>
            <div className="flex text-left justify-start p-2 mb-2 text-base font-medium">
              <span>{overview}</span>
            </div>
          </li>
        </div>
      </div>
    </>
  );
};

export default DetailModal;
