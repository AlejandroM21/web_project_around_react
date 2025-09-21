import { useEffect, useState } from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import logo_avatar from "../../public/logo_avatar.jpg";

function App() {
  // ==== GESTIÓN DE TARJETAS (CARDS) ==== //

  // Estado para manejar las tarjetas
  const [cards, setCards] = useState([]);

  // useEffect para cargar las tarjetas iniciales cuando el componente se monta
  useEffect(() => {
    // Llama a la función getInitialCards del archivo api.js y usa el objeto
    api
      .getInitialCards()
      .then((data) => {
        // Actualiza el estado de las tarjetas con los datos obtenidos
        setCards(data);
      })
      .catch((err) => {
        console.log("Error al obtener las tarjetas:", err);
      });
  }, []); // El array vacío significa que esto se ejecuta solo una vez al montar el componente

  // Actualiza el estado de las tarjetas cuando se da like o dislike a una tarjeta
  // (pasa la tarjeta actual como argumento)
  function handleCardLike(card) {
    const isLiked = card.isLiked; // Verifica si la tarjeta ya está marcada como "me gusta"

    // Llama a la función changeLikeCardStatus del archivo api.js con el ID de la tarjeta y el nuevo estado de like
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          //
          state.map(
            (currentCard) =>
              currentCard._id === card._id ? newCard : currentCard // Actualiza la tarjeta en el estado si los IDs coinciden, de lo contrario la deja igual
          )
        );
      })
      .catch((error) => console.error(error));
  }

  // Elimina una tarjeta (pasa la tarjeta actual como argumento)
  function handleCardDelete(card) {
    // Llama a la función deleteCard del archivo api.js con el ID de la tarjeta a eliminar
    const cardId = card._id; // Extrae el ID de la tarjeta
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(
          // currentCard es cada tarjeta en el estado actual. Filtra todas las tarjetas excepto la que tiene el ID igual a cardId
          // (la tarjeta eliminada) y actualiza el estado con el nuevo array de tarjetas
          (state) => state.filter((currentCard) => currentCard._id !== cardId)
        );
      })
      .catch((error) => console.error(error));
  }

  //function para agregar una nueva tarjeta
  function handleAddPlaceSubmit(newCardData) {
    api
      .addCard(newCardData) // Llama a la función addCard del archivo api.js con los datos de la nueva tarjeta
      .then((newCard) => {
        setCards([newCard, ...cards]); // Agrega la nueva tarjeta al inicio del array de tarjetas en el estado
      })
      .catch((err) => {
        console.log("Error al agregar una nueva tarjeta:", err);
      });
  }

  // ==== ACTUALIZAR PERFIL Y AVATAR ==== //

  // Estado para manejar la información del usuario
  const [currentUser, setCurrentUser] = useState({
    name: "Cargando...",
    about: "Cargando...",
    avatar: logo_avatar,
  });

  // Actualiza la información del usuario cuando se edita el perfil
  function handleUpdateUser(data) {
    // Retorna la promesa para que el componente que llama pueda manejar el estado de carga y los errores
    return api
      .updateUserInfo(data) //
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // Actualiza el estado currentUser con la nueva información del usuario
      })
      .catch((err) => {
        console.log("Error al actualizar la información del usuario:", err);
      });
  }

  // Actualiza la foto de perfil del usuario cuando se cambia el avatar
  function handleUpdateAvatar(avatarUrl) {
    // Retorna la promesa para que el componente que llama pueda manejar el estado de carga y los errores
    return api
      .updateAvatar(avatarUrl) //
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // Actualiza el estado currentUser con la nueva información del usuario
      })
      .catch((err) => {
        console.log("Error al actualizar la foto de perfil del usuario:", err);
      });
  }

  // useEffect para cargar la información del usuario cuando el componente se monta
  useEffect(() => {
    api
      .getUserInfo() //  Llama a la función getUserInfo del archivo api.js y usa el objeto
      .then((userData) => {
        setCurrentUser(userData);
      });
  }, []);

  // Proporciona el contexto CurrentUserContext a los componentes hijos (Header, Main, Footer)
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />
        <Main
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
