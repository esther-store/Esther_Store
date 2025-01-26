from rest_framework.viewsets import ModelViewSet
from .serializers import ContactInfoSerializer
from .models import ContactInfo
from rest_framework.permissions import IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.response import Response
from rest_framework import status
from store_api.paginators import NoPagination

# Create your views here.

class ContactInfoView(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = ContactInfoSerializer
    pagination_class = NoPagination
    queryset = ContactInfo.objects.all()
    
    def create(self, request, *args, **kwargs):
        if ContactInfo.objects.exists():
            return Response({"message":"Can't create more than one contact info"} , status = status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)