import { RemovePageLoader } from "@/components/RemovePageLoader";
import { pagesTitle } from "@/constants";

export default function Contact(){
    return(
        <main>
            <title>{pagesTitle.contact}</title>
            <RemovePageLoader/>
            Contact Page
        </main>
    )
}