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

    toast.success('Cliente cadastrado com sucesso!')
    e.target.reset()
    setInputs('')
  }


  return (
    <>
      <Header />
      <div id="insert">

        <h2>Cadastro de clientes</h2>
        <form onSubmit={handlCreateNewClient}>
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
                    checked={status === true}
                    onChange={() => setStatus(true)}
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
                  value={inputs.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="phone">
                <label>Telefone</label>
                <input
                  type="text"
                  name="phone"
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
                  value={inputs.cep}
                  onChange={handleInputChange}
                />
              </div>

              <div className="street">

                <label>Rua</label>
                <input
                  type="Rua"
                  name="street"
                  value={inputs.street}
                  onChange={handleInputChange}
                />
              </div>

              <div className="localNumber">
                <label>Número</label>
                <input
                  type="text"
                  name="localNumber"
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
                  value={inputs.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="state">

                <label>Estado</label>
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
            </div>


            <div className="attend">
              <div className="time">
                <label>Horário Abertura</label>
                <input
                  type="time"
                  name="time"
                  value={inputs.time}
                  onChange={handleInputChange}
                />
              </div>

              <div className="date">
                <label>Dia de Atendimento</label>
                <input
                  type="date"
                  name="date"
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
                  defaultChecked={useCar}
                  onClick={() => setUseCar(!useCar)}
                /> Carro
              </label>

              <label htmlFor="">
                <input
                  type="checkbox"
                  name="useTruck"
                  defaultChecked={useTruck}
                  onClick={() => setUseTruck(!useTruck)}
                /> Caminhão
              </label>
              <label>
                <input
                  type="checkbox"
                  name="useMotorcycle"
                  defaultChecked={useMotorcycle}
                  onClick={() => setUseMotorcycle(!useMotorcycle)}
                />Moto
              </label>
            </div>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}
