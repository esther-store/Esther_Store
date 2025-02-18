export function createContactInfoToEdit(e){
    const info = {
        phone: e?.target["phone"]?.value,
        whatsapp: e?.target["whatsapp"]?.value,
        email: e?.target["email"]?.value,
        location: e?.target["location"]?.value,
        facebook: e?.target["facebook"]?.value,
        instagram: e?.target["instagram"]?.value,
        telegram: e?.target["telegram"]?.value,
      };
    return info  
}