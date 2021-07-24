import { useContext, useEffect, useState } from "react";
import { ClientsContext } from "../ClientsContexts";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Header } from "../components/Header";
import ReactPaginate from "react-paginate"

import '../styles/table.scss'
import { api } from "../services/api";

export function TableOfClients({ handleOpenEditClientModal }) {
  const { removeClient, loadClient } = useContext(ClientsContext)

  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage] = useState(5)
  const [pageCount, setPageCount] = useState(0)


  async function handleRemoveClient(clientId) {
    await removeClient(clientId)
  }

  useEffect(() => {
    async function getData() {
      const res = await api.get('/clients')
      const data = res.data
      const slice = data.slice(offset, offset + perPage)
      const postData = slice.map(client => (
        <tr key={client.id}>
          <td>{client.id}</td>
          <td>{client.name}</td>
          <td>{client.secondParamName}</td>
          <td >{client.clientType}</td>
          <td><button className="edit" onClick={async () => { await loadClient(client.id); handleOpenEditClientModal() }}><FaEdit fontSize="1.3rem" /></button></td>
          <td><button className="remove" onClick={() => handleRemoveClient(client.id)}><FaTrashAlt /></button></td>
        </tr>
      ))
      setData(postData)
      setPageCount(Math.ceil(data.length / perPage))
    }

    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, offset])


  function handlePageClick(e) {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
  }



  return (
    <>
      <Header />
      <div id="table-init">
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>R.Social / Sobrenome</th>
              <th>Tipo Pessoa</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={10}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

