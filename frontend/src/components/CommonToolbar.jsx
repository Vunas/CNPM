import React from "react";

const CommonToolbar = ({ onAdd, onExport, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 ml-auto pl-4  rounded-3xl bg-gray-200">
      <div className="flex items-center bg-white rounded-full px-4 py-2 flex-grow max-w-[300px]">
        <i className="fas fa-search text-gray-400 text-sm"></i>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-2 w-96 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Search"
          type="search"
        />
      </div>
      <div className="flex items-center gap-3 ml-auto rounded-full px-3 py-2">
        <button
          onClick={onAdd}
          aria-label="Add"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <i className="fas fa-plus text-[#4a4a4a]"></i>
        </button>
        {/* <button
          aria-label="Filter"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <i className="fas fa-sliders-h text-[#4a4a4a]"></i>
        </button> */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-white text-[#4a4a4a] text-sm font-medium rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
          type="button"
        >
          <i className="fas fa-file-export text-sm"></i>
          Export
        </button>
      </div>
    </div>
  );
};

export default CommonToolbar;
