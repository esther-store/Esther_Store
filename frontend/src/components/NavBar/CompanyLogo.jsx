import Logo from "@/assets/Logo.webp"

export function CompanyLogo({style = null}){
    return(
        <div style = {style?style:styles.container}>
            <img src={Logo.src} width={50} height={40} alt = "Esther Store Logo"></img>
            <h1 style = {styles.h1}>Esther</h1>
        </div>
    )
}

const styles = {
    container:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:"5px"
    },
    h1:{
        margin:0,
        color:"#D9658F",
        fontFamily: 'Lora-Regular',
        fontWeight: 500,
        letterSpacing:'2px',
        fontSize:"35px"
    }
}