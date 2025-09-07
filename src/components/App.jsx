import { useState } from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

function App() {
  return (
    <div className="page__content">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
