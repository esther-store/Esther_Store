from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from store_api.models import Categoria, Producto

from user_profile_api.models import FavoriteProductsList

User = get_user_model()
# Create your tests here.

class FavoriteProductListModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username = "testuser", email = "testuser@example.com", password = "testpassword")
        self.favorite_list = FavoriteProductsList.objects.create(user = self.user)
    
    def test_product_that_does_not_exists_in_favorite_list(self):
        """Check if a product that does not exists is in favorite list"""
        result = self.favorite_list.in_favorite_list(51) 
        self.assertEqual(result, False)   

class FavoriteProductsListViewsTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username = "testuser", email = "testuser@example.com", password = "testpassword")
        self.client = APIClient()
        self.client.force_authenticate(user = self.user)
    
    def test_favorite_products_list_auto_create_when_create_new_user(self):
        """When a user is created, auto create a FavoriteProductsList for him"""
        user = User.objects.create(username = "testuser2", email = "testuser2@example.com", password = "testpassword2")
        favorite_product = FavoriteProductsList.objects.filter(user = user.id)
        self.assertEqual(favorite_product.exists(), True) 
    
    #add product to favorite list
    def test_add_product_that_does_not_exist_to_favorite_list(self):
        """When a user try to add a product that does not exists to his favorite list get 400 """
        response = self.client.post(reverse("user_profile_api:add_product_to_favorite_list", args = [1]), format = "json") 
        self.assertEqual(response.status_code, 400)    
        json_res = response.json()
        self.assertEqual(json_res["message"], "The product does not exists")
    
    def test_add_product_to_favorite_list(self):
        """Add a product to favorite list and get an 200"""
        #create a product and his category
        category = Categoria.objects.create(nombre = "category_test")
        product = Producto.objects.create(product_name = "product_test", precio = 100, categoria = category)  
        #add the product to the favorite list of the user
        response = self.client.post(reverse("user_profile_api:add_product_to_favorite_list", args = [product.id]), format = "json")
        self.assertEqual(response.status_code, 200)
    
    def test_add_product_that_is_already_in_favorite_list(self):
        """If the product is already in the favorites list get an 226 because a product can be only once in a favorites list"""
        #create a product and his category
        category = Categoria.objects.create(nombre = "category_test")
        product = Producto.objects.create(product_name = "product_test", precio = 100, categoria = category)  
        #add the product for first time to the favorite list
        self.client.post(reverse("user_profile_api:add_product_to_favorite_list", args = [product.id]), format = "json")
        #try to add the same product to the favorite list
        response = self.client.post(reverse("user_profile_api:add_product_to_favorite_list", args = [product.id]), format = "json")
        self.assertEqual(response.status_code, 226)
        res_json = response.json()
        self.assertEqual(res_json["message"], "The product is already in the favorite list")
    
    #remove product from favorite list
    def test_remove_product_that_does_not_exists_from_favorite_list(self):    
        """When a user try to remove a product that does not exists in his favorite list get 400 """
        response = self.client.post(reverse("user_profile_api:remove_product_from_favorite_list", args = [1]), format = "json") 
        self.assertEqual(response.status_code, 400)    
        json_res = response.json()
        self.assertEqual(json_res["message"], "The product does not exists")
    
    def test_remove_product_from_favorite_list(self):
        """Remove a product from favorite list and get an 200"""
        #create a product and his category
        category = Categoria.objects.create(nombre = "category_test")
        product = Producto.objects.create(product_name = "product_test", precio = 100, categoria = category)  
        #remove the product from the favorite list of the user
        response = self.client.post(reverse("user_profile_api:remove_product_from_favorite_list", args = [product.id]), format = "json")
        self.assertEqual(response.status_code, 200)    
