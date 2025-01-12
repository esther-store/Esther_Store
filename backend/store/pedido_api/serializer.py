from rest_framework import serializers
from .models import Pedido, ListaPedido
from store_api.serializers import ProductoSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class PedidoSerializer(serializers.ModelSerializer):
     user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
     finalizado = serializers.BooleanField(required=False)
     class Meta:
            model = Pedido
            fields = ['id','user',"finalizado", "total", "created_at"]

class ListaPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListaPedido
        fields = ['id',"producto","pedido","user", "cantidad", 'subtotal', 'created_at',"finalizado"]

class ReadListaPedidoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer() 
    class Meta:
        model = ListaPedido
        fields = ['id',"producto","pedido","user", "cantidad", 'subtotal', 'created_at',"finalizado"]        
       
           
                