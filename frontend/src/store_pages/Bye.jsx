import { RemovePageLoader } from '@/components/RemovePageLoader'
import {Link} from 'react-router-dom'

function Bye() {
    return ( 
        <>
            <RemovePageLoader/>
            <article style = {styles.article}>
                <header>Vuelve Pronto 👋</header>
                    <div style = {styles.div}>
                        <Link style = {styles.a} to="/">Inicio</Link>
                    </div>
            </article>
        </>
     )
}

export default Bye

const styles = {
    article:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Poppins-Regular',
        gap:'10px',
        color: 'rgba(0, 0, 0, 0.8)',
        position:"absolute",
        left:"50%",
        top:"50%",
        transform:"translate(-50%, -50%)"
    },
    
    div:{
        backgroundColor: '#D9658F',
        padding: '10px',
        borderRadius: '5px',
        textAlign:"center"
    },
    
    a:{
        color: 'white',
    }
}