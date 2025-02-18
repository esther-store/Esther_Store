from django.db import models

# Create your models here.
class ContactInfo(models.Model):
    phone = models.CharField(max_length = 25, blank = True, null = True)
    whatsapp = models.CharField(max_length = 25)
    email = models.EmailField(max_length = 100, blank = True, null = True)
    location = models.CharField(max_length = 1000, blank = True, null = True)
    facebook = models.CharField(max_length = 1000, blank = True, null = True)
    instagram = models.CharField(max_length = 1000, blank = True, null = True)
    telegram = models.CharField(max_length = 1000, blank = True, null = True)
        
    def __str__(self):
        return "Contact Info"    