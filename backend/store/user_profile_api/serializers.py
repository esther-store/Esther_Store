from django.forms import ValidationError
from rest_framework import serializers
from .models import FavoriteProductsList
from django.contrib.auth import get_user_model
from store_api.serializers import ProductoSerializer
from django.contrib.auth.password_validation import MinimumLengthValidator, UserAttributeSimilarityValidator, CommonPasswordValidator, NumericPasswordValidator
from django.contrib.auth.hashers import make_password

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'username','name', 'last_name', 'is_staff', 'is_active', 'phone', 'country', 'state', 'address', 'zip_code']
        
    def update(self,instance, validated_data):
        return super().update(instance, validated_data) 

class UserManagmentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required = True)
    password = serializers.CharField(write_only = True)
    is_active = serializers.BooleanField(initial = True)
    class Meta:
        model = User
        fields = ['id','email', 'username', "password",'name', 'last_name', 'is_staff', 'is_active', 'phone', 'country', 'state', 'address', 'zip_code']
    
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get('request')
        if request and request.method == 'PUT':
            # Hide password in update
            fields.pop('password')
        return fields
    
    def create(self, validated_data):
            #create the password hash
            validated_data["password"] = make_password(validated_data["password"])
            return super().create(validated_data)    

    
    def validate(self, data):
        request = self.context.get('request')
        try:
            #validate password if is post
            if request.method == "POST":
                # Extrae el password de data
                password = data["password"]
                # Valida el password con los validadores de Django
                validate_password(password)
                # Si no hay errores, devuelve data sin modificar
            return data
        except ValidationError as e:
            # Si hay errores, lanza una excepción con el mensaje
            raise serializers.ValidationError({"password": e.messages})

#this serializer return all the info of the products in the favorite products list
class FavoriteProductsListSerializer(serializers.ModelSerializer):
    products = ProductoSerializer(many = True, required = False)
    class Meta:
        model = FavoriteProductsList  
        fields = ["id", "user", "products"]

#this serializer return the list of the id of the products in favorite products list
class IdListOfFavoriteProductsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteProductsList  
        fields = ["id", "user", "products"]        

def validate_password(password):
    MinimumLengthValidator().validate(password = password)
    UserAttributeSimilarityValidator().validate(password = password)
    CommonPasswordValidator().validate(password = password)
    NumericPasswordValidator().validate(password = password)
    return password
    