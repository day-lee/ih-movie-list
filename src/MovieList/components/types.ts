export interface Movie {
  id: number;
  genre_ids: number[];
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
}

export const defaultMovie: Movie = {
  id: 0,
  genre_ids: [],
  overview: "",
  poster_path: "",
  release_date: "",
  title: "",
};

export interface MovieResponseState {
  results: Movie[];
  fetching: boolean;
  fetched: boolean;
  error: string;
  toggle: boolean;
  searchTerm: string;
  filter: string;
  sortBy: string;
  modalSelectedMovie: Movie;
}

export const initialMovieResponseState: MovieResponseState = {
  results: [],
  fetching: false,
  fetched: false,
  error: "",
  toggle: false,
  searchTerm: "",
  filter: "",
  sortBy: "",
  modalSelectedMovie: defaultMovie,
};

export type MovieResponseAction =
  | { type: "FETCH_DATA_LOADING" }
  | { type: "FETCH_DATA_SUCCESS"; payload: Movie[] }
  | { type: "FETCH_DATA_ERROR"; payload: string }
  | { type: "CLICK_MODAL_BUTTON"; payload: ModalToggleMovie }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_FILTER"; payload: string }
  | { type: "SET_SORT_BY"; payload: string }
  | { type: "NO-OP" };

export type ModalToggleMovie = Pick<
  MovieResponseState,
  "toggle" | "modalSelectedMovie"
>;
