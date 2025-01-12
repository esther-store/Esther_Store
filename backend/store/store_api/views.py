from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status 
from .models import Producto, Categoria, Promotion, Score
from .serializers import ProductoSerializer, CategoriesSerializer, PromotionSerializer, ScoreSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import *
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .paginators import NoPagination
User = get_user_model()

# Create your views here.        
class GetCategories(generics.ListAPIView):    
    queryset = Categoria.objects.all()
    serializer_class = CategoriesSerializer
    pagination_class = NoPagination

class PromotionList(generics.ListAPIView):
    queryset = Promotion.objects.filter(active = True)  
    serializer_class = PromotionSerializer
    pagination_class = NoPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', "is_special"] 
    search_fields = ['description', "name"]
    ordering_fields = ["updated_at", "discount_in_percent", "cantidad_products"]               
              
class RateProduct(APIView):  
    serializer_class = ScoreSerializer
    permission_classes = [IsAuthenticated]
          
    def post(self, request):
        try:
            #check if the user already rated the product
            try:
                Score.objects.get(user=request.user.id, product=request.data["product"])
                return Response(["El usuario ya ha puntuado el producto"],status = status.HTTP_401_UNAUTHORIZED)
            except ObjectDoesNotExist:
                if request.data["user"] != request.user.id:
                    return Response({"message":"El usuario no tiene permiso para solicitar esta informacion", "results":[]},status = status.HTTP_401_UNAUTHORIZED)
                info = self.serializer_class(data = request.data)
                if info.is_valid():
                    info.save()
                    product = Producto.objects.get(id = info.validated_data["product"].id)
                    product.update_puntuacion(info.validated_data["score"])
                    return Response([],status = status.HTTP_200_OK)
                return Response(status = status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)

#check if the user already rate a product
class CheckIfUserCanRate(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id_product):
        #if the user already scored the product show a 401 error to avoid that user score the product again
        try:
            Score.objects.get(user = request.user.id, product = id_product) 
            return Response(status = status.HTTP_401_UNAUTHORIZED) 
        except ObjectDoesNotExist:
            return Response(status = status.HTTP_200_OK)                        

class ProductList(generics.ListAPIView):
    queryset = Producto.objects.filter(is_active = True)
    serializer_class = ProductoSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', 'categoria', 'precio', "recommended", "promotion"] 
    search_fields = ['product_name',"product_description"]
    ordering_fields = ["product_name", "precio", "updated_at", "puntuacion",]
