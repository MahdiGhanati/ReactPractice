import { useEffect, useState } from "react";

/**
 *
 * @param {object} props
 * @param {object[]} props.allData
 * @param {number} props.pageRange
 * @param {number} props.countOnPage
 * @returns
 * [tableData, paginationData]
 * and use "tableData" as you know in your table and use "paginationData" like this :
 * <PagInation {...paginationData} />
 */

export const usePagination = ({ allData, pageRange, countOnPage }) => {
  const [pageCount, setPageCount] = useState(1);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [countPerPage, setCountPerPage] = useState(countOnPage);
  const allDataCount = allData.length

  const initData = allData;
  useEffect(() => {
    let pCount = Math.ceil(initData.length / countPerPage);
    setPageCount(pCount);
    let pArr = [];
    for (let i = 1; i <= pCount; i++) pArr = [...pArr, i];
    setPages(pArr);
  }, [initData, countPerPage]);

  useEffect(() => {
    let start = currentPage * countPerPage - countPerPage; // 0
    let end = currentPage * countPerPage; // 2
    setTableData(initData.slice(start, end));
  }, [currentPage, initData, countPerPage]);

  return [
    tableData,
    {
      pages,
      pageCount,
      currentPage,
      setCurrentPage,
      pageRange,
      countPerPage,
      setCountPerPage,
      allDataCount
    },
  ];
};
