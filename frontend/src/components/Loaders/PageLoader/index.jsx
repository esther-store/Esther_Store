import './index.css'
import { CompanyLogo } from '@/components/NavBar/CompanyLogo';

function PageLoader() {
    return(
        <section className = "page-loader">
            <CompanyLogo/>
        </section>
    )

}

export default PageLoader;