import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useReducer } from "react";

import DetailModal from "../DetailModal";
import FilterBox from "../FilterBox";
import movieReducer from "../reducer";
import { defaultMovie, initialMovieResponseState, Movie } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const APP_AUTH_TOKEN = import.meta.env.VITE_APP_AUTH_TOKEN;
const baseUrl = "https://image.tmdb.org/t/p/";
const size = "w500";
const fetchErrorMsg = "Error: Please try again later.";

const Main: React.FC = () => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieResponseState);
  const {
    results,
    fetching,
    error,
    searchTerm,
    filter,
    sortBy,
    toggle,
    modalSelectedMovie,
  } = state;

  const fetchMovies = async () => {
    dispatch({ type: "FETCH_DATA_LOADING" });
    try {
      const options: AxiosRequestConfig = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        headers: {
          accept: "applicatoin/json",
          Authorization: `Bearer ${APP_AUTH_TOKEN}`,
        },
      };
      const { data } = await axios(options);
      dispatch({ type: "FETCH_DATA_SUCCESS", payload: data.results });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg: string = error.message;
        if (!error.response) {
          dispatch({ type: "FETCH_DATA_ERROR", payload: errorMsg });
        } else if (error.response.status >= 400) {
          dispatch({ type: "FETCH_DATA_ERROR", payload: errorMsg });
          console.error(error.response.status + " Request error");
        } else if (error.response.status >= 500) {
          dispatch({ type: "FETCH_DATA_ERROR", payload: errorMsg });
          console.error(error.response.status + " Server Error");
        }
      } else if (error instanceof Error) {
        const errorMsg: string = error.message;
        dispatch({ type: "FETCH_DATA_ERROR", payload: errorMsg });
        console.error("Non-axios error", error.message);
      }
    }
  };

  const handleDetailClick = (movie: Movie) => {
    dispatch({
      type: "CLICK_MODAL_BUTTON",
      payload: { toggle: !toggle, modalSelectedMovie: movie },
    });
  };

  const handleCloseModalClick = () => {
    dispatch({
      type: "CLICK_MODAL_BUTTON",
      payload: { toggle: false, modalSelectedMovie: defaultMovie },
    });
  };

  const filteredResults = results
    .filter((movie) => {
      return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((movie) => {
      return filter ? movie.genre_ids.includes(Number(filter)) : true;
    })
    .sort((a, b) => {
      if (sortBy === "release_date") {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      }
      return a.title.localeCompare(b.title);
    });

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <FilterBox
        searchTerm={searchTerm}
        setSearchTerm={(term: string) =>
          dispatch({ type: "SET_SEARCH_TERM", payload: term })
        }
        filter={filter}
        setFilter={(genre: string) =>
          dispatch({ type: "SET_FILTER", payload: genre })
        }
        sortBy={sortBy}
        setSortBy={(sort: string) =>
          dispatch({ type: "SET_SORT_BY", payload: sort })
        }
      />
      <main role="main" className="flex max-w-[1280px] m-auto">
        <div className="flex items-center justify-center">
          {fetching ? (
            <div className="pt-[10%] font-bold text-2xl">
              <span>Loading ...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center pt-[10%] font-bold text-2xl ">
              {fetchErrorMsg}
              <div className="m-2"></div>
            </div>
          ) : (
            <div className="mt-10">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filteredResults.map((item) => {
                  const { id, poster_path, title } = item;
                  return (
                    <div
                      className="border-2 p-4 m-2 bg-white min-w-[200px] rounded-md hover:border-blue-400 hover:border-4"
                      key={id}
                    >
                      <li>
                        <div className="flex p-1">
                          <button onClick={() => handleDetailClick(item)}>
                            <img
                              src={`${baseUrl}${size}${poster_path}`}
                              alt={title}
                            />
                          </button>
                        </div>
                        <div className="p-1 h-10 overflow-hidden truncate font-semibold text-2xl">
                          <span>{title}</span>
                        </div>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {toggle && modalSelectedMovie && (
          <DetailModal
            toggle={toggle}
            selectedMovie={modalSelectedMovie}
            onToggleClick={handleCloseModalClick}
          />
        )}
      </main>
    </>
  );
};

export default Main;
