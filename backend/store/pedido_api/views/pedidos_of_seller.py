from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import ListaPedido
from store_api.models import Producto
from rest_framework.permissions import IsAuthenticated
from ..serializer import ReadListaPedidoSerializer

class GetPedidosOfSeller(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            #obtengo los pedidos que contienen los productos que le pertenecen al vendedor
            lista_pedido = ReadListaPedidoSerializer(ListaPedido.objects.filter(producto__user = request.user.id, finalizado = False), many = True)
            if lista_pedido == []:
                return Response(lista_pedido, status = status.HTTP_404_NOT_FOUND)
            return Response(lista_pedido.data, status = status.HTTP_200_OK)   
        except Exception as e:
            return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)        
        
class SetProductoEntregado(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            data = request.data["lista_pedido"]
            for id in data:
                pedido = ListaPedido.objects.get(id = id)
                pedido.finalizado = True
                pedido.save()  
            return Response(status = status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)