import React from "react";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useState } from "react";

const Logon = props => {
  const [id, setId] = useState("");
  const history = useHistory();

  const handleLogin = e => {
    e.preventDefault();

    api
      .post("sessions", { id })
      .then(res => {
        localStorage.setItem("ongId", id);
        localStorage.setItem("ongName", res.data.name);
        history.push("/profile");
      })
      .catch(err => {
        alert("Login inválido!");
      });
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="be the hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
};

export default Logon;
