import React, { useEffect, useState } from "react";
import { useRegistro } from "../../hooks/useRegistro";
import { RegistroTablesAdmin } from "../../components/Admin";

/* const API_URL = "http://127.0.0.1:8000/api/registro/"; */
const API_URL = "https://apicopperu.colegiodeobstetras.pe/api/registro/";

export function RegistrosAdmin() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API_URL}?page=${page}&page_size=${perPage}&search=${searchTerm}`)
      .then((response) => response.json())
      .then((json) => {
        if (json != null) {
          const dataResults = json.results;
          const countRegistros = Math.ceil(json.count / perPage);
          setData(dataResults);
          setTotalPages(countRegistros);
        }
      })
      .catch((error) => console.error(error));
  }, [page, perPage, searchTerm]);

  const handlePaginationChange = (e, { activePage }) => {
    setPage(activePage);
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    console.log("HandleLastPAge:", totalPages);
    setPage(totalPages);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  return (
    <>
      <RegistroTablesAdmin
        handleFirstPage={handleFirstPage}
        page={page}
        handlePaginationChange={handlePaginationChange}
        totalPages={totalPages}
        handleLastPage={handleLastPage}
        data={data}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
    </>
  );
}
