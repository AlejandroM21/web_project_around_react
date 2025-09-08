export default function NewCard({ closePopup }) {
  function handleSubmit(e) {
    e.preventDefault();
    closePopup();
  }
  return (
    <form
      className="popup__form popup__form_add"
      name="card-form"
      id="new-card-form"
      noValidate
    >
      <label htmlFor="card-name">
        <input
          type="text"
          className="popup__input popup__input_type_place-name"
          id="card-name" /*"place-name"*/
          name="card-name"
          placeholder="Titulo"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error card-name-error"></span>
      </label>

      <label htmlFor="card-link">
        <input
          type="url"
          className="popup__input popup__input_type_place-link"
          id="card-link" /* place-link*/
          name="card-link"
          placeholder="Enlace a la imagen"
          required
        />
        <span className="popup__error card-link-error"></span>
      </label>

      <button
        type="submit"
        className="popup__button popup__button_add"
        onClick={handleSubmit}
      >
        Crear
      </button>
    </form>
  );
}
