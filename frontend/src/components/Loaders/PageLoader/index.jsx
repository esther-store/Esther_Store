import './index.css'
import { CompanyLogo } from '@/components/NavBar/CompanyLogo';

function PageLoader({id}) {
    return(
        <section id = {id} className = "page-loader">
            <section>
                <CompanyLogo/>
            </section>
        </section>
    )

}

export default PageLoader;