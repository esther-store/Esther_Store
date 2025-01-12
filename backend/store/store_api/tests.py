from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Score, Producto, Categoria, User

class RateProductTest(TestCase):
    def setUp(self):
        # create a user
        self.user = User.objects.create(username="testuser", email="testuser@example.com", password="testpass")
        #create a product and his categorie
        self.categorie = Categoria.objects.create(nombre = "Test Categorie")
        self.product = Producto.objects.create(product_name="testproduct", precio=10.0, categoria = self.categorie)
        # create an APIClient instance
        self.client = APIClient()
        # authenticate the user
        self.client.force_authenticate(user=self.user)

    def test_user_can_rate_product(self):
        """If the user have not rated a product, can do it"""
        # make a GET request to the API endpoint with the product id
        response = self.client.get(reverse("check_user_can_rate", args = [self.product.id]))
        # assert that the response status code is 200 OK
        self.assertEqual(response.status_code, 200)
     
    def test_rate_product(self):
        """Rate a product and return 200 Ok"""
        response = self.client.post(reverse("rate_product"), {"user":self.user.id, "score":5, "product":self.product.id, "comment":""}, format = "json")
        self.assertEqual(response.status_code, 200)    

    def test_user_cannot_rate_product_twice(self):
        """The user cannot rate a product twice"""
        # create a score for the user and the product
        score = Score.objects.create(user=self.user, product=self.product, score=5)
        # make a GET request to the API endpoint with the product id
        response = self.client.get(reverse("check_user_can_rate", args = [self.product.id]))
        # assert that the response status code is 401 Unauthorized
        self.assertEqual(response.status_code, 401)

 