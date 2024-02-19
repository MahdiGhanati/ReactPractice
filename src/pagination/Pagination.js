import React, { useEffect} from "react";

/**
 * 
 * @param {object} props 
 * @param {number} props.pages
 * @param {number} props.pageCount
 * @param {number} props.currentPage
 * @param {()=>void} props.setCurrentPage
 * @param {number} props.pageRange
 * @param {number} props.countPerPage
 * @param {()=>void} props.setCountPerPage
 * @param {string} props.className
 * @returns 
 */

const PagInation = ({
  pages,
  pageCount,
  currentPage,
  setCurrentPage,
  pageRange,
  countPerPage,
  setCountPerPage,
  allDataCount,
  className
}) => {

  const handleChangeCountPerPage = (e)=>{
    let val = e.target.value
    if (val < 1) val = 1
    if (val > allDataCount) val = allDataCount
    setCountPerPage(val)
  }

  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`}>
      <div className="ms-2 d-flex align-items-center">
        <span className='badge alert-secondary text-center'>{allDataCount}</span>
      </div>
      <div className="ms-3" style={{width: "80px"}}>
        <input type="number" className="form-control w-100 text-center" value={countPerPage} onChange={handleChangeCountPerPage} />
      </div>
      {pages.length > 1 ? (
        <nav className="d-flex justify-content-center align-items-center">
          <ul className="pagination dir_ltr m-0">
            <li className="page-item">
              <span
                className={`page-link pointer ${
                  currentPage == 1 ? "disabled" : ""
                }`}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span>&raquo;</span>
              </span>
            </li>

            {currentPage > pageRange ? (
              <li className="page-item me-2">
                <span
                  className="page-link pointer"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </span>
              </li>
            ) : null}

            {pages.map((page) => {
              return page < currentPage + pageRange &&
                page > currentPage - pageRange ? (
                <li key={page} className="page-item">
                  <span
                    className={`page-link pointer ${
                      currentPage == page ? "alert-success" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </span>
                </li>
              ) : null;
            })}

            {currentPage <= pageCount - pageRange ? (
              <li className="page-item ms-2">
                <span
                  className="page-link pointer"
                  onClick={() => setCurrentPage(pageCount)}
                >
                  {pageCount}
                </span>
              </li>
            ) : null}

            <li className="page-item">
              <span
                className={`page-link pointer ${
                  currentPage >= pages.length ? "disabled" : ""
                }`}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </span>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export default PagInation;