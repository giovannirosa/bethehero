import React from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import "./styles.css";
import { useEffect } from "react";
import api from "../../services/api";
import { useState } from "react";

const Profile = props => {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(res => {
        setIncidents(res.data);
      });
  }, [ongId]);

  const handleDeleteIncident = id => {
    api
      .delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })
      .then(res => {
        setIncidents(incidents.filter(i => i.id !== id));
        alert("Caso deletado com sucesso!");
      })
      .catch(err => {
        alert("Erro ao deletar caso, tente novamente.");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="be the hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(i => (
          <li key={i.id}>
            <strong>CASO:</strong>
            <p>{i.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{i.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(i.value)}
            </p>

            <button onClick={() => handleDeleteIncident(i.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
