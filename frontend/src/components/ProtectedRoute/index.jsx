import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "../../context/authenticationContext";
import { Link } from "react-router-dom";
import "./index.css";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthenticationContext);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    console.log(auth.infoUser)
    if (auth.token) {
      setShowChildren(true);
    }
  }, [auth]);

  return showChildren ? (
    auth.infoUser?.is_staff?children:
    <section className="protected-route-page">
      <article>
        <header>No tienes los permisos necesarios para acceder a esta pagina</header>
        <div>
          <Link to = "/">Inicio</Link>
        </div>
      </article>
    </section>
  ) : (
    <section className="protected-route-page">
      <article>
        <header>Debes estar autenticad@ para acceder a esta página</header>
        <div>
          <Link to="/login">Iniciar Sesion</Link>
        </div>
      </article>
    </section>
  );
}

export default ProtectedRoute;
