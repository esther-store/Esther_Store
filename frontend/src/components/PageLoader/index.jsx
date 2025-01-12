import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from 'primereact/dialog';
import './index.css'

function PageLoader({visible,onHide}) {
    return(
        <Dialog className="pageLoader" style={{width:"0px",height:"0px"}} visible={visible} onHide={()=>onHide()}>
            <ProgressSpinner className="spinner-pageLoader"/>
        </Dialog>
    )

}

export default PageLoader;