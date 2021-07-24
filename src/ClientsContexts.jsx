import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from './services/api';


export const ClientsContext = createContext({})



export function ClientsProvider({children}) {
  const [clients, setClients] = useState([])
  const [editedClient, setEditedClient] = useState({})
  const [user, setUser] = useState()

  useEffect(() => {
      api.get('/clients')
        .then(res => setClients(res.data))
  }, [clients])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser)
    }
  }, [])

  async function registerUser(clientInput) {
    const response = await api.post('/login', clientInput)
    const data = response.data
    setUser(data)
    localStorage.setItem('user', user)
  }



  async function createClient(clientInput) {
    const response = await api.post('/clients', clientInput)
    const data = response.data
    setClients([
      ...clients,
      data,
    ])
  } 

  async function removeClient(clientId) {
    try {
      const updatedClient = [...clients]
      const clientIndex =  updatedClient.findIndex(client => client.id === clientId)

      if (clientIndex >= 0) {
        updatedClient.splice(clientIndex, 1)
        setClients(updatedClient)
        await api.delete(`/clients/${clientId}`)
      } else {
        throw Error()
      }

    } catch {
      toast.error('Erro ao remover cliente!')
    } 
  }

  async function loadClient(clientId) {
    try {
      const updatedClient = [...clients]  
      const clientIndex = updatedClient.findIndex(client => client.id === clientId)
  
      if (clientIndex >= 0) {
        const response = await api.get(`/clients/${clientId}`)
        const data = response.data
        setEditedClient(data)
      } else {
        throw Error();
      } 
      } catch {
        toast.error('Cliente não existe!')
    }
  }

  async function editClient(clientId, clientInput) {
    try {
      const updatedClient = [...clients]
      const clientExists = updatedClient.findIndex(client => client.id === clientId)
  
      if (clientExists >= 0) {
        updatedClient[clientExists] = {...updatedClient[clientExists]}
        setClients(updatedClient)
        await api.put(`/clients/${clientId}`, clientInput)
      } else {
        throw Error()
      }
    } catch {
      toast.error('Erro ao atualizar o cliente!')
    }

  }

  return (
    <ClientsContext.Provider value={{ clients, editedClient, createClient, removeClient, loadClient, editClient, registerUser}}>
      {children}
    </ClientsContext.Provider>
  );
}