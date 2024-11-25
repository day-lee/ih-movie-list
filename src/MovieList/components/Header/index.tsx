const Header: React.FC = () => {
  return (
    <>
      <header
        role="header"
        className="flex justify-center items-center sticky top-0 left-0 w-full h-20 bg-white shadow-lg z-20"
      >
        <div className="text-xl sm:text-3xl font-bold text-gray-800">
          IH Movie List
        </div>
      </header>
    </>
  );
};

export default Header;
