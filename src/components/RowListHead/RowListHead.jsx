import { useState, useEffect } from "react";
import RowListData from "../RowListData/RowListData";
import { CiSearch } from "react-icons/ci";
import "./RowListHead.css";

const RowListHead = ({ data, rowDeleteHandler, sRDH, updateRowHandler }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatedData, setUpdatedData] = useState(data);
  const [totalPages, setTotalPages] = useState(1);
  const [selectAllRows, setSelectAllRows] = useState(false);

  useEffect(() => {
    setUpdatedData(data);

    setTotalPages(Math.ceil(data?.length / rowsPerPage));
    return () => {
      setSelectAllRows(() => false);
    };
  }, [data, rowsPerPage]);

  useEffect(() => {
    setSelectAllRows(() => false);
  }, [currentPage]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = updatedData?.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPageHandler = () => {
    if (currentPage > 1) paginate(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) paginate(currentPage + 1);
  };

  const goToPageHandler = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPageHandler(i)}
          className={`pages_button ${
            i === currentPage ? "pages_button__active" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleSearch = () => {
    setCurrentPage(1);

    const filteredData = data?.filter((row) =>
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setUpdatedData(filteredData);

    setTotalPages(Math.min(Math.ceil(filteredData?.length / rowsPerPage), 3));
    if (searchTerm == "") {
      setTotalPages(Math.ceil(data?.length / rowsPerPage));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const selectAllRowsHandler = () => {
    setSelectAllRows((prev) => !prev);
  };

  return (
    <div className="table_cont">
      <div className="search_bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(() => e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="search-icon" onClick={() => handleSearch()}>
          <CiSearch size={25} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onClick={selectAllRowsHandler}
                checked={selectAllRows}
                onChange={() => {}}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        {updatedData && (
          <RowListData
            tableData={currentRows}
            rowDeleteHandler={rowDeleteHandler}
            sRDH={sRDH}
            updateRowHandler={updateRowHandler}
            selectAllRows={selectAllRows}
          />
        )}
      </table>
      <div className="pagination_controls__cont">
        <button onClick={() => paginate(1)}>First</button>
        <button onClick={prevPageHandler}>Previous</button>
        {renderPageNumbers()}
        <button onClick={nextPageHandler}>Next</button>
        <button onClick={() => paginate(totalPages)}>Last</button>
      </div>
    </div>
  );
};

export default RowListHead;
