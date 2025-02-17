from django.urls import path
from .views import ContactInfoView, ManageContactInfo
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
#manage promotions
router.register("manage", ManageContactInfo, basename = "manage-contact-info")

urlpatterns = [
    path("", ContactInfoView.as_view())
]
urlpatterns += router.urls