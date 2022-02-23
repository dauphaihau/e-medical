import React, {useState} from 'react';

const Pagination = ({totalStaff, staffPerPage}) => {

  const [currentPage, setCurrentPage] = useState(1);

  const staffNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStaff / staffPerPage); i++) {
    staffNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        className="mt-0 " onClick={() => setCurrentPage(1)}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {staffNumbers?.map((item, idx) => (
          <a
            key={idx}
            className="cursor-pointer"
            style={{
              "backgroundColor": (currentPage === idx + 1) ? "#5156be" : "#fff",
              "color": (currentPage === idx + 1) ? "#fff" : "black"
            }}
            onClick={() => setCurrentPage(item)}
          >{item}</a>
        )
      )}
      <button
        disabled={currentPage === totalStaff}
        className="mt-0 "
        onClick={() => setCurrentPage(totalStaff)}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;