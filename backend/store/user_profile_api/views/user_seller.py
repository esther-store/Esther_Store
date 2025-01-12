from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from ..serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

UserProfile = get_user_model()
                
class MakeUserSeller_api(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = UserProfile.objects.get(id = request.user.id) 
            user.is_seller = True
            user.save()
            return Response(status = status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_400_BAD_REQUEST)    
                 
class MakeUserNotSeller_api(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = UserProfile.objects.get(id = request.user.id) 
            user.is_seller = False
            user.save()
            return Response(status = status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_400_BAD_REQUEST)    