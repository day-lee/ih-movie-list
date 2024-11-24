import DetailModal from "./components/DetailModal";
import FilterBox from "./components/FilterBox";
import Header from "./components/Header";
import Main from "./components/Main";
import "./style.css";

const MovieList: React.FC = () => {
  return (
    <div className="wrapper">
      <h1 className="text-3xl">Movie list</h1>
      <Header />
      <FilterBox />
      <Main />
      <DetailModal />
    </div>
  );
};

export default MovieList;
