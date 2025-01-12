from django.contrib import admin
from .models import FavoriteProductsList

class FavoriteProductsListAdmin(admin.ModelAdmin):
    fields = ["user","products"]
    list_filter = ["user",]

# Register your models here.
admin.site.register(FavoriteProductsList, FavoriteProductsListAdmin)