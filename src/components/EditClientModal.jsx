import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal'
import { ClientsContext } from '../ClientsContexts';
import { apiStates } from '../services/api';

Modal.setAppElement('#root')



export function EditClientModal({isOpen, onRequestClose}) {
  const { editedClient, editClient } = useContext(ClientsContext) 
  
  const [inputs, setInputs] = useState({})
  

  const [states, setStates] = useState([])

  const [status, setStatus] = useState('')
  const [useCar, setUseCar] = useState(false)
  const [useTruck, setUseTruck] = useState(false)
  const [useMotorcycle, setUseMotorcycle] = useState(true)


  useEffect(() => {
    async function getStates() {
      const response = await apiStates.get('estados')
      const data = response.data
      setStates(data)
      
    } 
    getStates()
  }, [])

  function handleInputChange (e) {
    setInputs(inputs => ({...inputs, [e.target.name]: 
      e.target.value
    }))
  }

  async function handleEditClient(e) {
    e.preventDefault();

    await editClient(editedClient.id, {
      ...editedClient,
      ...inputs,
      status: status,
      useCar: useCar,
      useTruck: useTruck,
      useMotorcycle: useMotorcycle,
    })

    e.target.reset()
    setInputs('')
    setUseCar(false)
    setUseTruck(false)
    setUseMotorcycle(true)
    onRequestClose()
  }

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
    <h2>Você está editando {editedClient.name}</h2>

    <form onSubmit={handleEditClient}>
      <select
        defaultValue={editedClient.clientType}
        onChange={handleInputChange}
        name="clientType"
        value={inputs.clientType}
      >
        <option value=""></option>
        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
        <option value="Pessoa Física">Pessoa Física</option>
      </select>
      
      <input
        type="radio"
        name="status"
        defaultValue={editedClient.status}
        checked={status === "Ativo"}
        onChange={() => setStatus('Ativo')} /> Ativo
      <input
        type="radio"
        name="status"
        defaultValue={editedClient.status}
        checked={status === "Inativo"}
        onChange={() => setStatus('Inativo')} /> Inativo

      <input 
        type="text" 
        defaultValue={editedClient.name}
        value={inputs.name}
        name="name"
        onChange={handleInputChange}
      />
      {inputs.clientType === "" ?
        <label></label>
        : inputs.clientType === 'Pessoa Jurídica' ?
          <label>Nome Fantasia</label>
          :
          <label>Nome do Cliente</label>
      }
      <input 
        type="text"
        name="secondParamName"
        defaultValue={editedClient.secondParamName}
        value={inputs.secondParamName}
        onChange={handleInputChange}
      />
      {inputs.clientType === "" ?
        <label></label>
        : inputs.clientType === 'Pessoa Jurídica' ?
          <label>Razão Social</label>
          :
          <label>Sobrenome</label>
      }
      <input 
        type="text" 
        name="document"
        defaultValue={editedClient.document}
        value={inputs.document}
        onChange={handleInputChange}
      />
      {inputs.clientType === "" ? 
          <label></label> 
          : inputs.clientType === 'Pessoa Jurídica' ?
          <label>CNPJ</label>
          :
          <label>CPF</label>
        }

      <input 
        type="email"
        name="email" 
        defaultValue={editedClient.email}
        value={inputs.email}
        onChange={handleInputChange} 
      />
      <label>E-mail</label>

      <input 
        type="text" 
        name="phone"
        defaultValue={editedClient.phone}
        value={inputs.phone}
        onChange={handleInputChange}
      />
      <label>Telefone</label>

      <input 
        type="text"
        name="cep" 
        defaultValue={editedClient.cep}
        value={inputs.cep}
        onChange={handleInputChange}
      />
      <label>CEP</label>

      <input 
        type="Rua" 
        name="street"
        defaultValue={editedClient.street}
        value={inputs.street}
        onChange={handleInputChange}  
      />
      <label>Rua</label>

      <input 
        type="text" 
        name="localNumber"
        defaultValue={editedClient.localNumber}
        value={inputs.localNumber}
        onChange={handleInputChange}    
      />
      <label>Número</label>

      <input 
        type="Cidade" 
        name="city"
        defaultValue={editedClient.city}
        value={inputs.city}
        onChange={handleInputChange} 
      />
      <label>Cidade</label>
      
      <select
        onChange={handleInputChange}
        name="stateName"
        defaultValue={editedClient.stateName}
        value={inputs.stateName}
      >
        {states.map(state => (
          <option key={state.id}>{state.nome}</option>
        ))}
      </select>

      <input 
        type="time" 
        name="time"
        defaultValue={editedClient.time}
        value={inputs.time}
        onChange={handleInputChange} 
      />
      <label>Horário Abertura</label> 

      <input 
        type="date"
        name="date" 
        defaultValue={editedClient.date}
        value={inputs.date}
        onChange={handleInputChange}
      />
      <label>Dia de Atendimento</label>

      <input
        type="radio"
        name="useCar"
        defaultValue={editedClient.useCar}
        checked={useCar}
        onClick={() => setUseCar(!useCar)}
      /> Carro
      <input
        type="radio"
        name="useTruck"
        defaultValue={editedClient.useTruck}
        checked={useTruck}
        onClick={() => setUseTruck(!useTruck)}
      /> Caminhão
      <input
        type="radio"
        name="useMotorcycle"
        defaultValue={editedClient.useMotorcycle}
        checked={useMotorcycle}
        onClick={() => setUseMotorcycle(!useMotorcycle)}
      /> Moto

    <button type="submit">Enviar</button>
    </form>
      </Modal>
  );
}

