from django.contrib import admin
from .models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id","username",'email',)
    
admin.site.register(UserProfile, UserProfileAdmin)