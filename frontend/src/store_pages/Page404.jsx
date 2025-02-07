import "./pagesStyles/Page404.css";
import 'primeicons/primeicons.css';
import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate()
  return (
    <section className="page-404">
        <section className="message-container">
            <div>
              <i className="pi pi-exclamation-triangle"></i>
              <span>404 !</span>
              </div>
          <button onClick={() => navigate('/')}>Home</button>
        </section>
    </section>
    );
}

