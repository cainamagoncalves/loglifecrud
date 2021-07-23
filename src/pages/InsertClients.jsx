import { useState, useEffect, useContext } from "react";
import { ClientsContext } from "../ClientsContexts";
import { toast } from 'react-toastify';
import { apiStates } from "../services/api";

import '../styles/insertClients.scss'
import { Header } from "../components/Header";

export function InsertClients() {
  const [inputs, setInputs] = useState({})

  const { createClient } = useContext(ClientsContext)

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

  function handleInputChange(e) {
    e.persist();
    setInputs(inputs => ({
      ...inputs, [e.target.name]:
        e.target.value
    }))
  }

  async function handlCreateNewClient(e) {
    e.preventDefault()

    if (
      !inputs.clientType || !status || !inputs.name || !inputs.secondParamName ||
      !inputs.document || !inputs.email || !inputs.phone || !inputs.cep ||
      !inputs.street || !inputs.localNumber || !inputs.city || !inputs.stateName ||
      !inputs.time || !inputs.date
    ) {
      toast.warn("Preencha todos os campos!")
      return;
    }

    await createClient({
      ...inputs,
      status: status,
      useCar: useCar,
      useTruck: useTruck,
      useMotorcycle: useMotorcycle,
    })

    e.target.reset()
    setInputs('')
  }


  return (
    <>
      <Header />
      <form onSubmit={async () => handlCreateNewClient}>
        <div className="personal-data">

          <select
            onChange={handleInputChange}
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
                  checked={status === 'Ativo'}
                  onChange={() => setStatus('Ativo')}
                />
                <span className="radio-label"> Ativo</span>
              </span>
            </label>


            <label className="radio-class">
              <span className="radio-input">
                <input
                  type="radio"
                  checked={status === 'Inativo'}
                  onChange={() => setStatus('Inativo')}
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
                  <label>Nome Fantasia</label>
                  :
                  <label>Nome do Cliente</label>
              }
              <input
                type="text"
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
                name="secondParamName"
                value={inputs.secondParamName}
                onChange={handleInputChange}
              />

            </div>
          </div>

          <div className="contact">


            {inputs.clientType === "" ?
              <label></label>
              : inputs.clientType === 'Pessoa Jurídica' ?
                <label>CNPJ</label>
                :
                <label>CPF</label>
            }
            <input
              type="text"
              name="document"
              value={inputs.document}
              onChange={handleInputChange}
            />

            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
            />
            <label>E-mail</label>

            <input
              type="text"
              name="phone"
              value={inputs.phone}
              onChange={handleInputChange}
            />
            <label>Telefone</label>
          </div>
        </div>

        <div className="address">

          <input
            type="text"
            name="cep"
            value={inputs.cep}
            onChange={handleInputChange}
          />
          <label>CEP</label>

          <input
            type="Rua"
            name="street"
            value={inputs.street}
            onChange={handleInputChange}
          />
          <label>Rua</label>

          <input
            type="text"
            name="localNumber"
            value={inputs.localNumber}
            onChange={handleInputChange}
          />
          <label>Número</label>

          <input
            type="Cidade"
            name="city"
            value={inputs.city}
            onChange={handleInputChange}
          />
          <label>Cidade</label>

          <select
            onChange={handleInputChange}
            name="stateName"
            value={inputs.stateName}
          >
            {states.map(state => (
              <option key={state.id}>{state.nome}</option>
            ))}
          </select>
        </div>

        <div className="attend">

          <input
            type="time"
            name="time"
            value={inputs.time}
            onChange={handleInputChange}
          />
          <label>Horário Abertura</label>

          <input
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleInputChange}
          />
          <label>Dia de Atendimento</label>

          <input
            type="radio"
            name="useCar"
            checked={useCar}
            onClick={() => setUseCar(!useCar)}
          /> Carro
          <input
            type="radio"
            name="useTruck"
            checked={useTruck}
            onClick={() => setUseTruck(!useTruck)}
          /> Caminhão
          <input
            type="radio"
            name="useMotorcycle"
            checked={useMotorcycle}
            onClick={() => setUseMotorcycle(!useMotorcycle)}
          /> Moto
        </div>

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
