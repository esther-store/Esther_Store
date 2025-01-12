from django.contrib import admin
from django.urls import path,include
from authentication_api import urls as authentication_url
from store_api import urls as store_urls
from pedido_api import urls as pedido_urls
from user_profile_api import urls as user_profile_urls
from contact_info import urls as contact_info_url

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include(authentication_url)),
    path('store/', include(store_urls)),
    path('pedido/', include(pedido_urls)),
    path("user/", include(user_profile_urls)),
    path("contact_info/", include(contact_info_url)),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
