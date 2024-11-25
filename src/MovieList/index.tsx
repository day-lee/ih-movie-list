import Header from "./components/Header";
import Main from "./components/Main";
import "./style.css";

const MovieList: React.FC = () => {
  return (
    <div className="flex flex-col mb-20">
      <Header />

      <Main />
    </div>
  );
};

export default MovieList;
