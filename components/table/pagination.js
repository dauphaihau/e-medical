import {ChevronRightIcon, ChevronLeftIcon} from "@heroicons/react/outline";

const Pagination = (props) => {

  const {
    rows = [],
    itemsPerPage ,
    onPageChange,
    currentPage
  } = props;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(rows.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <p className='pagination__entries'>Hiển thị 1 đến {rows.length} của danh sách</p>
      <div className="pagination__num">
        <div className="pagination__num__item">
          <figure className={currentPage === 1? 'disabled':''}>
            <ChevronLeftIcon/>
          </figure>
          {pageNumbers.map(pageNumber => (
            <div key={pageNumber}>
              <a
                className={currentPage === pageNumber ? 'selected' : ''}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </a>
            </div>
          ))}
          <figure className={currentPage === rows.length - 1? 'disabled':''}>
            <ChevronRightIcon/>
          </figure>
        </div>
      </div>
    </div>
  )
}

export default Pagination;