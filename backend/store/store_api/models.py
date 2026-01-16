from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from store_api import utils
import os
from store_api.constants import PRODUCTS_MEDIA_FOLDER, CATEGORIES_MEDIA_FOLDER, PROMOTIONS_MEDIA_FOLDER

User = get_user_model()

# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(max_length= 50, unique=True, db_index=True)
    img = models.ImageField(upload_to = CATEGORIES_MEDIA_FOLDER)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    @property
    def cantidad_products(self):
        # Count the number of products related to this Category
        return Producto.objects.filter(categoria=self).count()
    
    class Meta:
        ordering = ["-id"]
    
    def __str__(self):
        return self.nombre

class Promotion(models.Model):
    name = models.CharField(max_length=200, db_index=True, unique=True)
    description = models.CharField(max_length = 500, default = "")  
    discount_in_percent = models.FloatField(validators = [MinValueValidator(limit_value=0)])
    img = models.ImageField(upload_to = PROMOTIONS_MEDIA_FOLDER) 
    active = models.BooleanField(default = True, db_index=True)
    is_special = models.BooleanField(default = False, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now_add=True) 

    @property
    def cantidad_products(self):
        # Contar el número de objetos Producto relacionados con esta instancia
        return Producto.objects.filter(promotion=self).count()
    
    class Meta:
        ordering = ["-id"]    
    
    def __str__(self):
        return self.name

class Producto(models.Model):
    product_name = models.CharField(max_length=100, unique=True, db_index=True)
    product_description = models.TextField(blank=True, null=True, default = "")
    is_active = models.BooleanField(default=True)
    in_stock = models.IntegerField(null=True, blank = True, default = 0, validators = [MinValueValidator(limit_value=0)])
    precio = models.FloatField(default = 0, validators = [MinValueValidator(limit_value=0)], db_index=True)
    descuento = models.FloatField(default = 0, validators = [MinValueValidator(limit_value=0), MaxValueValidator(limit_value=100)])
    categoria = models.ForeignKey(Categoria, on_delete= models.SET_NULL, blank=True, null=True)
    promotion = models.ForeignKey(Promotion, on_delete= models.SET_NULL, null=True, blank=True)
    recommended = models.BooleanField(default = False, db_index=True)
    product_img1 = models.ImageField(upload_to = PRODUCTS_MEDIA_FOLDER, default = f"{PRODUCTS_MEDIA_FOLDER}/blank.webp", max_length=255)
    product_img2 = models.ImageField(upload_to = PRODUCTS_MEDIA_FOLDER, default = f"{PRODUCTS_MEDIA_FOLDER}/blank.webp", blank = True, null = True, max_length=255)
    product_img3 = models.ImageField(upload_to = PRODUCTS_MEDIA_FOLDER, default = f"{PRODUCTS_MEDIA_FOLDER}/blank.webp", blank = True, null = True, max_length=255)
    keywords = models.TextField(blank=True, default="", db_index=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True, db_index=True)
    
    #puntuacion de productos
    cantidad_puntuaciones = models.IntegerField(default = 0, validators = [MinValueValidator(limit_value=0)])
    total_puntos = models.IntegerField(default = 0, validators = [MinValueValidator(limit_value=0)])
    puntuacion = models.IntegerField(default = 0, validators = [MinValueValidator(limit_value=0)],db_index=True)
    
    @property
    def price_with_discounts(self):
        # Return the price with all discounts applyed
        priceWithDiscount = self.precio

        # product self discount
        if self.descuento > 0 and self.descuento <= 100:
            priceWithDiscount -= (self.precio * self.descuento/100)
            
        # discount by promotion 
        if self.promotion and self.promotion.discount_in_percent > 0 and self.promotion.discount_in_percent <= 100 and self.promotion.active == True:
            priceWithDiscount -= (self.precio * self.promotion.discount_in_percent/100)
        
        if priceWithDiscount < 0:
            return 0

        return priceWithDiscount   

    def update_puntuacion(self, new_puntuacion):
        self.cantidad_puntuaciones += 1
        self.total_puntos += new_puntuacion
        self.puntuacion = int(self.total_puntos / self.cantidad_puntuaciones)
        self.save()
    
    class Meta:
        ordering = ["-id"]
    
    def __str__(self):
        return self.product_name
    
class Score(models.Model):
    score = models.IntegerField(default = 1, validators=[validators.MinValueValidator(1), validators.MaxValueValidator(5)])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Producto, on_delete=models.CASCADE)
    comment = models.CharField(max_length = 255, default = "", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-id"]
    
    def __str__(self):
        return str(self.score)
     
# Generate product keywords used on searching products
@receiver(post_save, sender=Categoria)
def regenerate_keywords_for_products_with_category(instance, **kwargs):
    products = Producto.objects.filter(categoria=instance)
    for product in products:
        product.keywords = utils.generate_product_keywords(product) 
    Producto.objects.bulk_update(products, ['keywords'])  

@receiver(post_save, sender=Promotion)
def regenerate_keywords_for_products_with_promotion(instance, **kwargs):
    products = Producto.objects.filter(promotion=instance)
    for product in products:
        product.keywords = utils.generate_product_keywords(product)
    Producto.objects.bulk_update(products, ['keywords'])

@receiver(pre_save, sender=Producto)
def generate_product_keywords(instance, **kwargs):
    instance.keywords = utils.generate_product_keywords(instance)        

#Delete related images on product delete
@receiver(post_delete, sender=Producto)
def delete_product_images(sender, instance, **kwargs):
    for attr in ['product_img1', 'product_img2', 'product_img3']:
        img = getattr(instance, attr)
        if img and img != 'productos_images/blank.webp':
            img_path = img.path
            if os.path.exists(img_path):
                os.remove(img_path)

#Delete related image on category delete
@receiver(post_delete, sender=Categoria)
def delete_category_image(sender, instance, **kwargs):
    img = getattr(instance, 'img')
    if img:
        img_path = img.path
        if os.path.exists(img_path):
            os.remove(img_path)

#Delete related image on promotion delete
@receiver(post_delete, sender=Promotion)
def delete_promotion_image(sender, instance, **kwargs):
    img = getattr(instance, 'img')
    if img:
        img_path = img.path
        if os.path.exists(img_path):
            os.remove(img_path)
