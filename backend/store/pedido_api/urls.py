from django.urls import path
from .views.pedidos import Pedido_api, ListaPedido_api 
from .views.pedidos_of_seller import GetPedidosOfSeller, SetProductoEntregado

urlpatterns = [
    path('', Pedido_api.as_view(), name = 'pedido'),
    path('pedidos-of-seller/', GetPedidosOfSeller.as_view(), name = 'pedidos_of_seller'),
    path('lista-pedido/', ListaPedido_api.as_view(), name = 'lista_pedido'),
    path('lista-pedido/<int:id_pedido>', ListaPedido_api.as_view(), name = 'lista_pedido'),
    path('set-pedidos-finalizados/', SetProductoEntregado.as_view(), name = 'lista_pedido'),
]
