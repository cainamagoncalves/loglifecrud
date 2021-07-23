import { useContext } from "react";
import { ClientsContext } from "../ClientsContexts";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

export function TableOfClients({ handleOpenEditClientModal }) {
  const { clients, removeClient, loadClient} = useContext(ClientsContext)

  function handleRemoveClient(clientId) {
    removeClient(clientId)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Razão Social/Sobrenome</th>
            <th>Tipo de Pessoa</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.secondParamName}</td>
              <td>{client.clientType}</td>
              <td><button onClick={async () => {await loadClient(client.id); handleOpenEditClientModal()}}><FaEdit /></button></td>
              <td><button onClick={() => handleRemoveClient(client.id)}><FaTrashAlt /></button></td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
}