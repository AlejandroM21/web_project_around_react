export default function EditProfile() {
  return (
    <form className="popup__form" noValidate>
      <label htmlFor="name">
        <input
          type="text"
          className="popup__input"
          name="name"
          id="name"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error name-error"></span>
      </label>

      <label htmlFor="about-me">
        <input
          type="text"
          className="popup__input"
          name="job"
          id="about-me"
          placeholder="Acerca de mi"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error about-me-error"></span>
      </label>

      <button type="submit" className="popup__button">
        Guardar
      </button>
    </form>
  );
}
