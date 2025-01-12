import {Link} from 'react-router-dom'

function Bye() {
    return ( 
        <section className="protected-route-page">
            <article>
                <header>Vuelve Pronto 👋</header>
                    <div>
                        <Link to="/">Inicio</Link>
                    </div>
            </article>
        </section>
     );
}

export default Bye;