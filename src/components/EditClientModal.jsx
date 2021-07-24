import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal'
import { ClientsContext } from '../ClientsContexts';
import { apiStates } from '../services/api';
import closeImg from '../assets/images/fechar.svg'

import '../styles/insertClients.scss'

Modal.setAppElement('#root')



export function EditClientModal({isOpen, onRequestClose}) {
  const { editedClient, editClient } = useContext(ClientsContext) 
  
  const [inputs, setInputs] = useState({})
  

  const [states, setStates] = useState([])

  const [status, setStatus] = useState(false)
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
    setStatus(false)
    setUseCar(false)
    setUseTruck(false)
    setUseMotorcycle(true)
    onRequestClose()
  }

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-class"
      >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      ><img src={closeImg} alt="Fechar modal" />

      </button>

    <div id="insert">
        <form onSubmit={handleEditClient}>
          <div className="personal-data">

            <select
              onChange={handleInputChange}
              defaultValue={editedClient.clientType}
              name="clientType"
              value={inputs.clientType}
            >
              <option value=""></option>
              <option value="Pessoa Jurídica">Pessoa Jurídica</option>
              <option value="Pessoa Física">Pessoa Física</option>
            </select>

            <div className="radio">
              <label className="radio-class">
                <span className="radio-input">
                  <input
                    type="radio"
                    checked={status === true}
                    onChange={() => setStatus(true) }
                  />
                  <span className="radio-label"> Ativo</span>
                </span>
              </label>


              <label className="radio-class">
                <span className="radio-input">
                  <input
                    type="radio"
                    checked={status === false}
                    onChange={() => setStatus(false)}
                  />
                  <span className="radio-label"> Inativo</span>
                </span>
              </label>
            </div>

            <div className="nameset">
              <div className="name">
                {inputs.clientType === "" ?
                  <label></label>
                  : inputs.clientType === 'Pessoa Jurídica' ?
                    <label>Empresa</label>
                    :
                    <label>Nome</label>
                }
                <input
                  type="text"
                  defaultValue={editedClient.name}
                  value={inputs.name}
                  name="name"
                  onChange={handleInputChange}
                />

              </div>
              <div className="second-param">

                {inputs.clientType === "" ?
                  <label></label>
                  : inputs.clientType === 'Pessoa Jurídica' ?
                    <label>Razão Social</label>
                    :
                    <label>Sobrenome</label>
                }
                <input
                  type="text"
                  defaultValue={editedClient.secondParamName}
                  name="secondParamName"
                  value={inputs.secondParamName}
                  onChange={handleInputChange}
                />

              </div>
            </div>

            <div className="contact">

              <div className="document">
                {inputs.clientType === "" ?
                  <label></label>
                  : inputs.clientType === 'Pessoa Jurídica' ?
                    <label>CNPJ</label>
                    :
                    <label>CPF</label>
                }
                <input
                  type="text"
                  defaultValue={editedClient.document}
                  name="document"
                  value={inputs.document}
                  onChange={handleInputChange}
                />
              </div>

              <div className="email">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editedClient.email}
                  value={inputs.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="phone">
                <label>Telefone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editedClient.phone}
                  value={inputs.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="address-init">

              <div className="cep">

                <label>CEP</label>
                <input
                  type="text"
                  name="cep"
                  defaultValue={editedClient.cep}
                  value={inputs.cep}
                  onChange={handleInputChange}
                />
              </div>

              <div className="street">

                <label>Rua</label>
                <input
                  type="Rua"
                  name="street"
                  defaultValue={editedClient.street}
                  value={inputs.street}
                  onChange={handleInputChange}
                />
              </div>

              <div className="localNumber">
                <label>Número</label>
                <input
                  type="text"
                  name="localNumber"
                  defaultValue={editedClient.localNumber}
                  value={inputs.localNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="district">

              <div className="city">
                <label>Cidade</label>
                <input
                  type="Cidade"
                  name="city"
                  defaultValue={editedClient.city}
                  value={inputs.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="state">

                <label>Estado</label>
                <select
                  onChange={handleInputChange}
                  defaultValue={editedClient.stateName}
                  name="stateName"
                  value={inputs.stateName}
                >
                  {states.map(state => (
                    <option key={state.id}>{state.nome}</option>
                  ))}
                </select>
              </div>
            </div>


            <div className="attend">
              <div className="time">
                <label>Horário Abertura</label>
                <input
                  type="time"
                  name="time"
                  defaultValue={editedClient.time}
                  value={inputs.time}
                  onChange={handleInputChange}
                />
              </div>

              <div className="date">
                <label>Dia de Atendimento</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={editedClient.date}
                  value={inputs.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="vehicle">

              <label>
                <input
                  type="checkbox"
                  name="useCar"
                  defaultChecked={useCar === true}
                  onClick={() => setUseCar(!useCar)}
                /> Carro
              </label>

              <label>
                <input
                  type="checkbox"
                  name="useTruck"
                  defaultChecked={useTruck === true}
                  onClick={() => setUseTruck(!useTruck)}
                /> Caminhão
              </label>
              <label>
                <input
                  type="checkbox"
                  name="useMotorcycle"
                  defaultChecked={useMotorcycle === true}
                  onClick={() => setUseMotorcycle(!useMotorcycle)}
                />Moto
              </label>
            </div>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
      </Modal>
  );
}

