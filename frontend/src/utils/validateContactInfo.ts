import type { ContactInfoType } from "@/Types";

export function validateContactInfo(info: ContactInfoType) {
  if (info.email == null || info.email == "") {
    throw new Error("Debes ingresar un email");
  }
  try {
    new URL(info.facebook);
  } catch (err) {
    throw new Error("La url de Facebook no es correcta");
  }
  try {
    new URL(info.instagram);
  } catch (err) {
    throw new Error("La url de Instagram no es correcta");
  }
  if(info.whatsapp == null || info.whatsapp == ""){
    throw new Error("Debes ingresar un número de Whatsapp");
  }
  if(info.whatsapp.length !== 11){
    throw new Error("Debes ingresar un número de Whatsapp válido. Ej: +5354535170");
  }
  if(validatePhoneNumber(info.whatsapp) === false){
    throw new Error("Debes ingresar un número de Whatsapp válido. Ej: +5354535170")
  }
  if(info.phone.length !== 11){
    throw new Error("Debes ingresar un número de teléfono válido. Ej: +5354535170");
  }
  if(validatePhoneNumber(info.phone) === false){
    throw new Error("Debes ingresar un número de teléfono válido. Ej: +5354535170")
  }
}

function validatePhoneNumber(number:string){
  
  const patron = /^(\+?1?)?(\d{10}|\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\(\d{3}\)[-.\s]?\d{3}[-.\s]?\d{4})$/;
  
  return patron.test(number);
}
