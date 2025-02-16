import React, { useContext, useEffect, useState } from "react";
import AuthenticationContext from "@/context/authenticationContext";
import { Link } from "react-router-dom";
import { RemovePageLoader } from "@/components/RemovePageLoader";

function ProtectedRoute({ children }) {
  const { auth } = useContext<any>(AuthenticationContext);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    if (auth.token) {
      setShowChildren(true);
    }
  }, [auth]);

  return showChildren ? (
    auth.infoUser?.is_staff?children:
    <section>
      <RemovePageLoader/>
      <article style={styles.article}>
        <header>No tienes los permisos necesarios para acceder a esta pagina</header>
        <div style={styles.div}>
          <Link style={styles.a} to = "/">Inicio</Link>
        </div>
      </article>
    </section>
  ) : (
    <section>
      <RemovePageLoader/>
      <article style={styles.article}>
        <header>Debes estar autenticad@ para acceder a esta página</header>
        <div style={styles.div}>
          <Link style={styles.a} to="/login">Iniciar Sesion</Link>
        </div>
      </article>
    </section>
  );
}

export default ProtectedRoute;

const styles = {
  article:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems:"center",
      fontFamily: 'Poppins-Regular',
      gap:'10px',
      color: 'rgba(0, 0, 0, 0.8)',
      position:"absolute",
      left:"50%",
      top:"40%",
      transform:"translate(-50%, -40%)"
  },
  
  div:{
      backgroundColor: '#D9658F',
      padding: '10px',
      borderRadius: '5px',
      width:"fit-content",
      textAlign:"center"
  },
  
  a:{
      color: 'white',
  }
}
