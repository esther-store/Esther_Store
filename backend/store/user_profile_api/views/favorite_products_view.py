from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics
from django.urls import reverse

from store_api.models import Producto
from ..serializers import FavoriteProductsListSerializer, IdListOfFavoriteProductsListSerializer
from rest_framework.permissions import IsAuthenticated
from ..models import FavoriteProductsList
from django.core.exceptions import ObjectDoesNotExist
        
class GetUserFavoriteProductsList(generics.ListAPIView):
    serializer_class = FavoriteProductsListSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
            queryset = FavoriteProductsList.objects.filter(user = self.request.user.id)
            return queryset

class GetIdOfProductInFavoriteList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = IdListOfFavoriteProductsListSerializer(FavoriteProductsList.objects.get(user = request.user.id))
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddProductToFavoriteList(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id_product):
        try:
            favorite_list = FavoriteProductsList.objects.get(user = request.user.id)
            product = Producto.objects.get(id = id_product)     
            if favorite_list.in_favorite_list(product):
                return Response({"message":"The product is already in the favorite list", "results":[]}, status = status.HTTP_226_IM_USED)
            favorite_list.add_product(product)
            return Response(status = status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({"message":"The product does not exists", "results":[]},status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RemoveProductFromFavoriteList(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id_product):
        try:
            favorite_list = FavoriteProductsList.objects.get(user = request.user.id)
            product = Producto.objects.get(id = id_product)     
            favorite_list.remove_product(product)
            return Response(status = status.HTTP_200_OK)    
        except ObjectDoesNotExist:
            return Response({"message":"The product does not exists", "results":[]},status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       