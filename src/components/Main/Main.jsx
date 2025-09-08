import { useState } from "react";
import logo_avatar from "../../../public/logo_avatar.jpg";
import NewCard from "./form/NewCard/NewCard";
import EditProfile from "./form/EditProfile/EditProfile";
import EditAvatar from "./form/EditAvatar/EditAvatar";
import Popup from "./Popup/Popup";
import Card from "./Card/Card";

export default function Main() {
  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([
    {
      isLiked: false,
      _id: "5d1f0611d321eb4bdcd707dd",
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
      owner: "5d1f0611d321eb4bdcd707dd",
      createdAt: "2019-07-05T08:10:57.741Z",
    },
    {
      isLiked: false,
      _id: "5d1f064ed321eb4bdcd707de",
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
      owner: "5d1f0611d321eb4bdcd707dd",
      createdAt: "2019-07-05T08:11:58.324Z",
    },
  ]);

  console.log(cards);

  // Abrir el popup de addCard, Perfile, Avatar
  const newCardPopup = {
    title: "Nuevo Lugar",
    children: <NewCard closePopup={handleClosePopup} />,
  };

  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile closePopup={handleClosePopup} />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar closePopup={handleClosePopup} />,
  };

  // cierra el popup poniendo popup de nuevo a null
  function handleClosePopup() {
    setPopup(null);
  }

  // handlers para abrir cada popup
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  //Dar like
  // Si los IDs coinciden, crea una nueva tarjeta con todas las propiedades de la anterior (...card),
  //  pero con la propiedad isLiked invertida (si era true ahora es false, y viceversa).
  function handleLike(cardToLike) {
    setCards(
      cards.map((card) =>
        card._id === cardToLike._id ? { ...card, isLiked: !card.isLiked } : card
      )
    );
  }

  //Eliminar tarjetas
  function handleDelete(cardToDelete) {
    setCards(cards.filter((card) => card._id !== cardToDelete._id));
    handleClosePopup();
  }

  return (
    <main className="main">
      {/* <!-- ===== Sección Perfil ===== --> */}

      {/* Avatar */}
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={logo_avatar}
            alt="Avatar Por Defecto"
            className="profile__avatar-image"
          />
          {/* Botón para actualizar avatar */}
          <button
            className="profile__button-update-avatar"
            aria-label="Editar Avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        {/* INFO PERFIL */}
        <div className="profile__info">
          <div className="profile__info-name">
            <h2 className="profile__name">Alejandro Meléndez</h2>

            {/* Botón para editar perfil */}
            <button
              className="profile__button-edit"
              aria-label="Editar perfil"
              onClick={() => handleOpenPopup(editProfilePopup)}
            ></button>
          </div>
          <p className="profile__about-me block">Ingeniero de Sistemas</p>
        </div>

        {/* <!-- ===== Sección de Tarjetas ===== --> */}

        {/* NUEVA TARJETA */}
        <button
          className="profile__button-add"
          aria-label="Agregar nuevo elemento"
          title="Agregar nuevo"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <ul className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card} // Aqui traemos esos props del componente Cards card={{ name: "Valle de Yosemite", link: "/images/yosemite.jpg", isLiked: false,}}
            onDelete={handleDelete}
            onLike={handleLike}
            handleOpenPopup={handleOpenPopup}
          />
        ))}
      </ul>

      {/* renderización condicional de Popup */}
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
