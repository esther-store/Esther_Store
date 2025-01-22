from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators
from django.dispatch import receiver
from django.db.models.signals import pre_delete
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

# Create your models here.
class Categoria(models.Model):
    nombre = models.CharField(max_length= 50, unique=True)
    img = models.ImageField(upload_to = "categories_images", default = "productos_images/blank.png")
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
    name = models.CharField(max_length=200, default = "Promoción")
    description = models.CharField(max_length = 500, default = "Productos rebajados")  
    discount_in_percent = models.FloatField(validators = [MinValueValidator(limit_value=1)])
    img = models.ImageField(upload_to = "promotions", default = "productos_images/blank.png") 
    active = models.BooleanField(default = True)
    is_special = models.BooleanField(default = False)
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
    product_name = models.CharField(max_length=100)
    product_description = models.CharField(max_length=500, blank=True, null=True, default = "")
    is_active = models.BooleanField(default=True)
    in_stock = models.IntegerField(null=True, blank = True, default = 0, validators = [MinValueValidator(limit_value=0)])
    precio = models.FloatField(default = 0, validators = [MinValueValidator(limit_value=0)])
    descuento = models.FloatField(default = 0, validators = [MinValueValidator(limit_value=0), MaxValueValidator(limit_value=100)])
    categoria = models.ForeignKey(Categoria, on_delete= models.SET_NULL, blank=True, null=True)
    promotion = models.ForeignKey(Promotion, on_delete= models.SET_NULL, null=True, blank=True)
    recommended = models.BooleanField(default = False)
    product_img1 = models.ImageField(upload_to = "productos_images", default = "productos_images/blank.png")
    product_img2 = models.ImageField(upload_to = "productos_images", default = "productos_images/blank.png", blank = True, null = True)
    product_img3 = models.ImageField(upload_to = "productos_images", default = "productos_images/blank.png", blank = True, null = True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)
    
    #puntuacion de productos
    cantidad_puntuaciones = models.IntegerField(default = 0, validators = [MinValueValidator(limit_value=0)])
    total_puntos = models.IntegerField(default = 0, validators = [MinValueValidator(limit_value=0)])
    puntuacion = models.IntegerField(default = 0, validators = [MinValueValidator(limit_value=0)])
    
    @property
    def price_with_discounts(self):
        # Return the price with all discounts applyed
        priceWithDiscount = self.precio

        # product self discount
        if self.descuento > 0 and self.descuento <= 100:
            priceWithDiscount -= (self.precio * self.descuento/100)
        
        # discount by promotion 
        if self.promotion.discount_in_percent > 0 and self.promotion.discount_in_percent <= 100 and self.promotion.active == True:
            priceWithDiscount -= (self.precio * self.promotion.discount_in_percent/100)

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
     
    
