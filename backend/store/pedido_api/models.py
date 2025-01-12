from django.db import models
from django.contrib.auth import get_user_model
from store_api.models import Producto
from django.db.models import F, Sum, FloatField

User = get_user_model()

# Create your models here.

class Pedido(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.FloatField(default=0)
    finalizado = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["id"]
        
    def __str__(self):
        return f"{self.id}"  

class ListaPedido(models.Model):
    pedido = models.ForeignKey(Pedido, related_name = "lista_pedido",on_delete=models.CASCADE) 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default = 1, null=False)
    subtotal = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    finalizado = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.id}"  