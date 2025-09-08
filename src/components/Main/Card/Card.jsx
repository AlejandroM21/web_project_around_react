import ImagePopup from "../form/ImagePopup/ImagePopup";
import RemoveCard from "../form/RemoveCard/RemoveCard";

export default function Card({ card, onDelete, onLike, handleOpenPopup }) {
  const { name, link, isLiked } = card;

  // Abrir el popup de Image y Trash
  const imageComponent = {
    title: "",
    children: <ImagePopup card={card} />,
  };

  const confirmatiotrash = {
    title: "¿Estás seguro/a?",
    children: <RemoveCard onDelete={onDelete} card={card} />,
  };

  return (
    <article className="elements__card">
      {/* Botón para eliminar */}
      <button
        className="elements__trash"
        aria-label="Eliminar tarjeta"
        onClick={() => handleOpenPopup(confirmatiotrash)}
      ></button>

      {/* Imagen de la tarjeta */}
      <img
        className="elements__card-image"
        src={link}
        alt={`fotografia de ${name}`}
        onClick={() => handleOpenPopup(imageComponent)}
      />

      {/* Información de la tarjeta */}
      <div className="elements__card-info">
        <h3 className="elements__card-title block">{name}</h3>

        {/* Botón para Like */}
        <button
          className={`${
            isLiked
              ? "elements__card-favorite_active elements__card-favorite"
              : "elements__card-favorite"
          }`}
          aria-label="Like card"
          type="button"
          onClick={() => onLike(card)}
        ></button>
      </div>
    </article>
  );
}
