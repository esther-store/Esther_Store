from rest_framework.response import Response
from rest_framework import status 
from .models import Producto, Categoria, Promotion
from .serializers import ProductoSerializer, CategoriesSerializer, PromotionSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import generics, filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import *
from .paginators import NoPagination
from rest_framework.decorators import action

User = get_user_model()

class ProductsManagment(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class =  ProductoSerializer
    queryset = Producto.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', 'categoria', 'precio', "recommended", "is_active", "promotion"] 
    search_fields = ['product_name',]
    ordering_fields = ["product_name", "precio", "updated_at", "puntuacion",]
    
    def delete(self, request):
        try:
            products_to_delete = request.data["products_to_delete"]
            if products_to_delete == [] or products_to_delete == None:
                return super().delete(request)
            try:
                productos = Producto.objects.filter(id__in=products_to_delete)
                productos.delete()
                return Response([], status = status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response([], status = status.HTTP_400_BAD_REQUEST)
        except :
            return Response([], status = status.HTTP_400_BAD_REQUEST)

class ManageCategories(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = CategoriesSerializer
    queryset = Categoria.objects.all()
    pagination_class = NoPagination
    
    def delete(self, request):
        try:
            categories_to_delete = request.data["categories_to_delete"]
            if categories_to_delete == [] or categories_to_delete == None:
                return super().delete(request)
            try:
                categories = Categoria.objects.filter(id__in=categories_to_delete)
                categories.delete()
                return Response([], status = status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response([], status = status.HTTP_400_BAD_REQUEST)
        except:
            return Response([], status = status.HTTP_400_BAD_REQUEST)   

class PromotionsManagment(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Promotion.objects.all()  
    serializer_class = PromotionSerializer
    pagination_class = NoPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', "is_special", "active"] 
    search_fields = ['description',"name"]
    ordering_fields = ["updated_at", "discount_in_percent", "cantidad_products"]         
    
    def delete(self, request):
        try:
            promotions_to_delete = request.data["promotions_to_delete"]
            if promotions_to_delete == [] or promotions_to_delete == None:
                return super().delete(request)
            try:
                promotions = Promotion.objects.filter(id__in=promotions_to_delete)
                promotions.delete()
                return Response([], status = status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response([], status = status.HTTP_400_BAD_REQUEST)
        except:
            return Response([], status = status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["post"], detail=True)
    def add_products_to_promotion(self, request, pk):
        products = request.data["products"]
        try:
            Producto.objects.filter(id__in=products).update(promotion = pk)
            return Response([], status = status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response([], status = status.HTTP_400_BAD_REQUEST)     
        except:
            return Response([], status = status.HTTP_500_INTERNAL_SERVER_ERROR)  
           
    @action(methods=["post"], detail=True)
    def remove_products_from_promotion(self, request, pk):
        products = request.data["products"]
        try:
            Producto.objects.filter(id__in=products).update(promotion = None)
            return Response([], status = status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response([], status = status.HTTP_400_BAD_REQUEST)     
        except:
            return Response([], status = status.HTTP_500_INTERNAL_SERVER_ERROR)     
    