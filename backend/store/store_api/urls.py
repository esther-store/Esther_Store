from django.urls import path
from . import views
from .manage_views import ManageCategories, ProductsManagment, PromotionsManagment
from rest_framework import routers

router = routers.SimpleRouter()
#manage promotions
router.register("manage-promotions", PromotionsManagment, basename = "promotion-managment")
#manage categories
router.register("manage-categories", ManageCategories, basename = "categories-managment")
#manage products
router.register("manage-products", ProductsManagment, basename = "products-managment")

urlpatterns = [
    path('products',views.ProductList.as_view()),
    path('categories/', views.GetCategories.as_view()),
    path('promotions/', views.PromotionList.as_view()),
    path('rate-product/', views.RateProduct.as_view(), name = "rate_product"),
    path('check-user-can-rate/<int:id_product>', views.CheckIfUserCanRate.as_view(), name = "check_user_can_rate"),
]

urlpatterns += router.urls