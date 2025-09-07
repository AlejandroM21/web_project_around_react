export default function RemoveCard({ onDelete, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  }

  return (
    <form className="popup__form popup__form_trash" noValidate>
      <button type="submit" className="popup__button popup__button_add">
        Si
      </button>
    </form>
  );
}
