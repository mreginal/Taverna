import React, { useState, useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import "./ModalProfile.css";
import { RiCloseFill } from "react-icons/ri";

export const ModalProfile: React.FC = () => {
  const userProfile = useProfile();
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setModal(!modal);
  };

  useEffect(() => {
    if (!userProfile) {
      return; // Retorna se userProfile for null
    }

    if (modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }, [modal, userProfile]); // Certifique-se de incluir userProfile como dependência

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Informações
      </button>

      {modal && userProfile && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Informações de usuário</h2>
            <ul>
              <li>
                <span>Nome: </span>
                {userProfile.name}
              </li>
              <li>
                <span>Email: </span>
                 {userProfile.email}
              </li>
              <li>
                <span>Gênero: </span>
                {userProfile.gender}
              </li>
              <li>
                <span>Data de Nascimento: </span>
                {userProfile.birthdate}
              </li>
            </ul>
            <button className="close-modal" onClick={toggleModal}>
              <RiCloseFill/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
