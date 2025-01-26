from rest_framework import serializers
from .models import Producto, Categoria, Promotion, Score
from django.contrib.auth import get_user_model

User = get_user_model()

class CategoriesSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(required=False)
    cantidad_products = serializers.IntegerField(read_only = True)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Categoria
        fields = ['id', 'nombre', "img", "cantidad_products", "created_at", "updated_at"]

    #img only required on create
    def validate(self, attrs):
        if self.instance is None and 'img' not in attrs:
            raise serializers.ValidationError({"img": "This field is required."})
        return attrs

class PromotionSerializer(serializers.ModelSerializer):
    cantidad_products = serializers.IntegerField(read_only = True)
    img = serializers.ImageField(required=False)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Promotion
        fields = "__all__" 

    #img only required on create
    def validate(self, attrs):
        if self.instance is None and 'img' not in attrs:
            raise serializers.ValidationError({"img": "This field is required."})
        return attrs    

class ProductoSerializer(serializers.ModelSerializer):
    precio = serializers.FloatField(required = True)
    categoria_full_info = CategoriesSerializer(source='categoria', read_only=True)
    promotion_full_info = PromotionSerializer(source='promotion', read_only=True)
    price_with_discounts = serializers.FloatField(read_only = True)
    created_at = serializers.DateTimeField(read_only=True)
    keywords = serializers.CharField(read_only = True)

    class Meta:
        model = Producto
        fields = ['id',
                  'product_name',
                  'categoria',
                  'promotion',
                  "puntuacion",
                  "cantidad_puntuaciones",
                  'product_description',
                  'precio',
                  'price_with_discounts',
                  "is_active",
                  "recommended",
                  "in_stock",
                  "descuento",
                  'product_img1',
                  'product_img2',
                  'product_img3',
                  "categoria_full_info",
                  "promotion_full_info",
                  'keywords',
                  "updated_at",
                  "created_at"
                  ]
    
    #product_img1 only required on create
    def validate(self, attrs):
        if self.instance is None and 'product_img1' not in attrs:
            raise serializers.ValidationError({"product_img1": "This field is required."})
        return attrs 

class ScoreSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Score
        fields = ['id', 'score', "user", "product", "comment", "created_at", "updated_at"]          