import searchMagnifier from "../../assets/search.svg";

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: string;
  setFilter: (genre: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const FilterBox: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <>
      <div role="filter" className="flex flex-col">
        {/* search box */}
        <div className="flex justify-center items-center w-full h-20 mt-10">
          <div className="relative">
            <label htmlFor="searchInput" className="sr-only">
              Search
            </label>
            <input
              id="searchInput"
              className="pl-2 border-2 border-gray-700 rounded-md w-[300px] h-10 z-10"
              type="text"
              name="search"
              value={searchTerm}
              placeholder="Search movies..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              className=" absolute top-[5px] right-2 w-7"
              src={searchMagnifier}
              alt="search"
            />
          </div>
        </div>
        {/* sort  */}
        <div className="flex justify-around">
          <div>
            <select
              className="cursor-pointer font-bold text-lg px-2 py-1 rounded-xl hover:bg-blue-400"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Sort by Title</option>
              <option value="release_date">Release Date</option>
            </select>
          </div>
          {/* filter */}
          <div>
            <select
              className="cursor-pointer font-bold text-lg px-2 py-1 rounded-xl hover:bg-blue-400"
              id="filterByGenre"
              name="filterByGenre"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value=""> Filter by Genre</option>
              <option value="16">Animation</option>
              <option value="28">Action</option>
              <option value="18">Drama</option>
              <option value="27">Horror</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBox;
