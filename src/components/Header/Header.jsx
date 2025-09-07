import logo_header from "../../../public/logo_header.png";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo_header}
        alt="Logo Alrededor de EE.UU."
      />
    </header>
  );
}
