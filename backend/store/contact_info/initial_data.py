from contact_info.models import ContactInfo  

def run():
    if ContactInfo.objects.all().count() == 0:
        print("Creating initial contact info ...")
        ContactInfo.objects.get_or_create(
            phone = "",
            whatsapp = "" ,
            email = "",
            location = "" ,
            facebook = "",
            instagram = "",
            telegram = "",
        )


