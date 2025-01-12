from django.urls import path,include
from .views import ContactInfoView
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
#manage promotions
router.register("", ContactInfoView, basename = "contact-info")

urlpatterns = []
urlpatterns += router.urls