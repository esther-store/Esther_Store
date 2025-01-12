from django.contrib import admin
from .models import Pedido, ListaPedido

class ListaPedidoAdmin(admin.ModelAdmin):
    list_display = ("id", "producto", "pedido", "user", "cantidad", 'subtotal',"created_at","finalizado")
    list_filter = ('user',"pedido","finalizado")

class ListaPedidoInline(admin.StackedInline):
    model = ListaPedido
    extra = 3    
    
class PedidoAdmin(admin.ModelAdmin):
    list_display = ("id","user","total","finalizado") 
    list_filter = ('user',"finalizado",)  
    inlines = [ListaPedidoInline, ] 

admin.site.register(Pedido, PedidoAdmin)
admin.site.register(ListaPedido, ListaPedidoAdmin)


# Register your models here.
