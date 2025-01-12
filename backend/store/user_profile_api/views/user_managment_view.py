from ..serializers import UserManagmentSerializer, validate_password
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import get_user_model
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status 
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework.decorators import action

User = get_user_model()

class UsersManagment(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()  
    serializer_class = UserManagmentSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['id', "is_active", "is_staff"] 
    search_fields = ['last_name',"name", "email", "username"]
    
    def delete(self, request):
        try:
            users_to_delete = request.data["users_to_delete"]
            if users_to_delete == [] or users_to_delete == None:
                return super().delete(request)
            try:
                users = User.objects.filter(id__in=users_to_delete)
                users.delete()
                return Response([], status = status.HTTP_200_OK)
            except ObjectDoesNotExist:
                return Response([], status = status.HTTP_400_BAD_REQUEST)
        except:
            return Response([], status = status.HTTP_400_BAD_REQUEST)

    @action(methods=["PUT"], detail=True)
    def change_password(self, request, pk):
        try:
            password = request.data["new_password"]
            try:
                validated_password = validate_password(password)
                user = User.objects.get(id = pk)
                user.set_password(validated_password)
                user.save()
                return Response([], status = status.HTTP_200_OK)
            except ValidationError as e:
                # Si hay errores, lanza una excepción con el mensaje
                return Response({"password": e.messages}, status = status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message":"Password was not provided"}, status = status.HTTP_400_BAD_REQUEST)