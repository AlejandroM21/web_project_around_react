export default function EditAvatar() {
  return (
    <form className="popup__form popup__form_avatar" noValidate>
      <label htmlFor="avatar">
        <input
          type="url"
          className="popup__input popup__input_type_avatar-link"
          id="avatar"
          name="avatar"
          placeholder="Enlace foto de perfil"
          required
        />
        <span className="popup__error avatar-error"></span>
      </label>
      <button type="submit" className="popup__button popup__button-avatar">
        Guardar
      </button>
    </form>
  );
}
