import { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";


import 'react-toastify/dist/ReactToastify.css';
import { ClientsContext } from "../ClientsContexts";
import '../styles/login.scss'

export function LoginPage() {

  const { registerUser } = useContext(ClientsContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [pageRedirect, setPageRedirect] = useState(false)

  function handleSubmitLogin(e) {
    e.preventDefault()
    try {
      if (username === '' || password === '') {
        toast.warn("Preencha todos os campos!")
        return;
      } else {

        registerUser({
          username: username,
          password: password,
        })

        setPageRedirect(true)
      }

    } catch {
      toast.error("Erro ao fazer o login!")
    }

  }

  return (
    <div id="login">
      <div className="form">
        <form action="" onSubmit={handleSubmitLogin}>
          <h2>Faça seu login</h2>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="E-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />

          <button type="submit">Entrar</button>
        </form>
        {pageRedirect && (
          <Redirect to={'/home'} />
        )}
      </div>
    </div>
  );
}