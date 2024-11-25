import {
  initialMovieResponseState,
  MovieResponseAction,
  MovieResponseState,
} from "./types";

function movieReducer(
  state: MovieResponseState = initialMovieResponseState,
  action: MovieResponseAction
): MovieResponseState {
  switch (action.type) {
    case "FETCH_DATA_LOADING": {
      return {
        ...state,
        fetching: true,
      };
    }
    case "FETCH_DATA_ERROR": {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    case "FETCH_DATA_SUCCESS": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        results: action.payload,
      };
    }
    case "CLICK_MODAL_BUTTON": {
      return {
        ...state,
        toggle: action.payload.toggle,
        modalSelectedMovie: action.payload.modalSelectedMovie,
      };
    }
    case "SET_SEARCH_TERM": {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case "SET_SORT_BY": {
      return {
        ...state,
        sortBy: action.payload,
      };
    }
    case "NO-OP": {
      return state;
    }
    default:
      return state;
  }
}

export default movieReducer;
