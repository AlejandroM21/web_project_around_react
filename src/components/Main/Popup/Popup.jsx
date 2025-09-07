export default function Popup(props) {
  const { title, children, onClose } = props;

  return (
    <div className=" popup ">
      <div className={` ${!title ? "card-popup__overlay" : "popup__overlay"}`}>
        {/* <!-- Botón de cierre --> */}
        <button
          className={
            !title ? "card-popup__button-close" : "popup__button-close"
          }
          aria-label="Cerrar modal"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
