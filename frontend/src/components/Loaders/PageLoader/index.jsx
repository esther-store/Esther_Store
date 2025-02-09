import './index.css'
import { CompanyLogo } from '@/components/NavBar/CompanyLogo';

function PageLoader({id}) {
    return(
        <section id = {id} className = "page-loader">
            <CompanyLogo/>
        </section>
    )

}

export default PageLoader;