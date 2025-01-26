from django.contrib import admin
from .models import Categoria, Producto, Promotion, Score
from import_export.admin import ImportExportModelAdmin
from import_export import resources

class ProductoResource(resources.ModelResource):
    class Meta:
        model = Producto
        
class CategoriaResource(resources.ModelResource):
    class Meta:
        model = Categoria

# Register your models here.
class CategoriaAdmin(ImportExportModelAdmin):
    resource_classes = [CategoriaResource]
    list_display = ("id","nombre", "updated_at", "created_at")
    list_filter = ("created_at",)
    search_fields = ("nombre",)

class PromotionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description", "discount_in_percent", "cantidad_products", "img", "active", "is_special", "updated_at", "created_at")
    list_filter = ("active", "is_special", "created_at")
    
class ScoreAdmin(admin.ModelAdmin):
    list_display = ("id","score", "user", "product", "comment", "created_at", "updated_at")
    list_filter = ("product", "user") 
    
class ProductoAdmin(ImportExportModelAdmin):
    resource_classes = [ProductoResource]
    list_display = ("id",
                    "product_name",
                    "precio",
                    "descuento",
                    "categoria",
                    "promotion",
                    "puntuacion", 
                    "in_stock",
                    "cantidad_puntuaciones", 
                    "total_puntos", 
                    "recommended", 
                    "product_img1", 
                    "product_img2", 
                    "product_img3", 
                    'keywords',
                    "updated_at",
                    "created_at")
    list_filter = ("categoria", "promotion", "recommended")
    search_fields = ("product_name",)
    
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Promotion, PromotionAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(Score, ScoreAdmin)

