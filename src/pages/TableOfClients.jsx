import { useContext } from "react";
import { ClientsContext } from "../ClientsContexts";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Header } from "../components/Header";

import '../styles/table.scss'

export function TableOfClients({ handleOpenEditClientModal }) {
  const { clients, removeClient, loadClient } = useContext(ClientsContext)

  function handleRemoveClient(clientId) {
    removeClient(clientId)
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
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.secondParamName}</td>
                <td >{client.clientType}</td>
                <td><button className="edit" onClick={async () => { await loadClient(client.id); handleOpenEditClientModal() }}><FaEdit fontSize="1.3rem" /></button></td>
                <td><button className="remove" onClick={() => handleRemoveClient(client.id)}><FaTrashAlt /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}