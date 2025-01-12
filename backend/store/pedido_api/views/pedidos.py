from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Pedido, ListaPedido
from ..serializer import ListaPedidoSerializer, PedidoSerializer, ReadListaPedidoSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class Pedido_api(APIView):
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]
    #get the pedidos of the user
    def get(self, request):
        try:
            pedidos = PedidoSerializer(Pedido.objects.filter(user = request.user.id), many = True)
            return Response(pedidos.data, status = status.HTTP_200_OK) 
        except:
            return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    #create a new pedido   
    def post(self, request):
        serializer_pedido = self.serializer_class(data = {'user':request.user.id})
        if serializer_pedido.is_valid() == False:
            return Response(status = status.HTTP_400_BAD_REQUEST)
        pedido = serializer_pedido.save()
        return Response({"id_pedido":pedido.id}, status = status.HTTP_201_CREATED)  
    
#list with the products of the pedido
class ListaPedido_api(APIView):
    serializer_class = ListaPedidoSerializer
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_pedido):
        try:
            lista_pedido = ReadListaPedidoSerializer(ListaPedido.objects.filter(pedido = id_pedido), many = True)
            return Response(lista_pedido.data, status = status.HTTP_200_OK)
        except Exception as e:
            return Response(status = status.HTTP_500_INTERNAL_SERVER_ERROR  )
        
    def post(self, request):
        try:
            total = 0
            lista_pedido = [] 
            
            for element in request.data['lista_pedido']: 
                data =  {
                        'pedido':request.data['id_pedido'],
                        'user':request.user.id,
                        'producto':element['id'],
                        'cantidad':element['cantidad'],
                        'subtotal':element['subtotal'],
                        }
                serializer = self.serializer_class(data = data)
                if serializer.is_valid() == False:
                    return Response(status =status.HTTP_400_BAD_REQUEST) 
                instance = ListaPedido(**serializer.validated_data) 
                lista_pedido.append(instance)     
                total += element['subtotal']
            
            ListaPedido.objects.bulk_create(lista_pedido)    
            total_pedido(request.data['id_pedido'], total)  
            return Response(status =status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status =status.HTTP_500_INTERNAL_SERVER_ERROR)
      
def total_pedido(id_pedido, total):
    '''
    Recive el id del pedido y el total de la suma 
    de los subtotales de la lista de pedidos
    '''  
    pedido = Pedido.objects.get(id = id_pedido) 
    pedido.total = total
    pedido.save()

   
          