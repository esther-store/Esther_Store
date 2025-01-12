from django.db import models

# Create your models here.
class ContactInfo(models.Model):
    phone1 = models.CharField(max_length = 25, blank = True, null = True)
    phone2 = models.CharField(max_length = 25, blank = True, null = True)
    whatsapp = models.CharField(max_length = 25)
    email1 = models.EmailField(max_length = 100, blank = True, null = True)
    email2 = models.EmailField(max_length = 100, blank = True, null = True)
    location = models.CharField(max_length = 1000, blank = True, null = True)
    remesas = models.CharField(max_length = 1000, blank = True, null = True)
    envios = models.CharField(max_length = 1000, blank = True, null = True)
    facebook = models.CharField(max_length = 1000, blank = True, null = True)
    instagram = models.CharField(max_length = 1000, blank = True, null = True)
    telegram = models.CharField(max_length = 1000, blank = True, null = True)
        
    def __str__(self):
        return "Contact Info"    