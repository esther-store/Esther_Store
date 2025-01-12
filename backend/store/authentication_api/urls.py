from django.urls import path, include
from authentication_api.views import CustomUserDetailsView

urlpatterns = [
    path('register/', include('dj_rest_auth.registration.urls')),
    path('user/', CustomUserDetailsView.as_view(), name='rest_user_details'),  # Sobrescribir la vista de usuario
    path('', include('dj_rest_auth.urls')),
]