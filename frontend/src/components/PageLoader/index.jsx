import Icon from '@/assets/icons/plus-icon.svg'
import './index.css'

function PageLoader() {
    return(
        <section className = "page-loader">
            <img width = {50} height={50} src = {Icon.src}/>
        </section>
    )

}

export default PageLoader;