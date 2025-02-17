from rest_framework.viewsets import ModelViewSet
from .serializers import ContactInfoSerializer
from .models import ContactInfo
from rest_framework.permissions import IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly
from rest_framework.response import Response
from rest_framework import status, generics
from store_api.paginators import NoPagination
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from store.settings import DEBUG

if DEBUG:
    CACHE_TIME = 0
else:
    CACHE_TIME = 60 * 5    

# Create your views here.

@method_decorator(cache_page(CACHE_TIME), name='dispatch')
class ContactInfoView(generics.ListAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    pagination_class = NoPagination
    
class ManageContactInfo(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, DjangoModelPermissionsOrAnonReadOnly]
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    pagination_class = NoPagination
    
    def create(self, request, *args, **kwargs):
        if ContactInfo.objects.exists():
            return Response({"message":"Can't create more than one contact info"} , status = status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)