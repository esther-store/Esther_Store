export function validatePassword(password){
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/;
    if(password.length < 8){
        return "La contraseña debe tener al menos 8 caracteres"
    }
    else if(!regex.test(password)){
        return "La contraseña debe contener al menos un número, una letra y una mayúscula"
    }
    else{

    }
    return "ok"
}