import './index.css'

function Loader() {
    return ( 
        <section className = "loader-container">
            <div style = {{width:"40px", height:"40px"}}>
                <div className = "loader"></div>
            </div>
        </section>
    );
}

export default Loader;

