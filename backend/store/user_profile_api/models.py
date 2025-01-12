from django.db import models
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from store_api.models import Producto
from django.db.models.signals import post_save 
User = get_user_model()

# Create your models here.
class FavoriteProductsList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(to = Producto, blank=True)
    
    def get_products_list(self):
        return self.products.all()
    
    def add_product(self, product):
        self.products.add(product)
        self.save()
    
    def remove_product(self, product):
        self.products.remove(product)
        self.save()    
    
    def in_favorite_list(self, product):
        return product in self.products.all() 
    
    def __str__(self):
        return f"{self.id} {self.user}"

@receiver(post_save, sender=User)
def create_favorite_list(sender, instance, created, **kwargs):
    if created:
        FavoriteProductsList.objects.create(user=instance)    

    
