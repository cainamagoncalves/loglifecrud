import { Link } from "react-router-dom";
import logLifeImg from '../assets/images/loglife.png';

import '../styles/header.scss'

export function Header() {
  return (
    <header id="header">
      <div>
        <img src={logLifeImg} alt="Imagem Log Life" />
        <a href="/">Cadastro</a>
        <a href="/">Tabela</a>
      </div>
    </header>
  );
}