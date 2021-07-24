import { Link } from "react-router-dom";
import logLifeImg from '../assets/images/loglife.png';

import '../styles/header.scss'

export function Header() {
  return (
    <header id="header">
      <div>
        <img src={logLifeImg} alt="Imagem Log Life" />
        <Link to="/home">Cadastro</Link>
        <Link to="/clients">Tabela</Link>
      </div>
    </header>
  );
}