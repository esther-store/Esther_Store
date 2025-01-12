from django.urls import path
from .views import favorite_products_view, user_managment_view, user_seller
from rest_framework import routers

router = routers.SimpleRouter()
#manage promotions
router.register("managment", user_managment_view.UsersManagment, basename = "user-management")

app_name = "user_profile_api"
urlpatterns = [
    #user profile urls
    path('make-user-seller/', user_seller.MakeUserSeller_api.as_view()),
    path('quit-user-seller/', user_seller.MakeUserNotSeller_api.as_view()),
    #favorite products list urls
    path('get-favorite-products-list/', favorite_products_view.GetUserFavoriteProductsList.as_view(), name = "get_favorite_products_list"),
    path('id-of-favorite-products/', favorite_products_view.GetIdOfProductInFavoriteList.as_view(), name = "get_ids_of_products_in_favorite_list"),
    path('favorite-products-list/add/<int:id_product>/', favorite_products_view.AddProductToFavoriteList.as_view(), name = "add_product_to_favorite_list"),
    path('favorite-products-list/remove/<int:id_product>/', favorite_products_view.RemoveProductFromFavoriteList.as_view(), name = "remove_product_from_favorite_list"),
]

urlpatterns += router.urls