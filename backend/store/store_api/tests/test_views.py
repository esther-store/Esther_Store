from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from ..models import Score, Producto, Categoria, Promotion, User

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

class GetCategoriesTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_categories(self):
        response = self.client.get(reverse("get_categories"))
        self.assertEqual(response.status_code, 200)  

class PromotionListTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.promotion1 = Promotion.objects.create(name="Summer Sale", discount_in_percent=10, active=True, is_special=True)
        self.promotion2 = Promotion.objects.create(name="Winter Sale", discount_in_percent=20, active=False, is_special=False)
        self.promotion3 = Promotion.objects.create(name="Spring Sale", discount_in_percent=15, active=True, is_special=False)

    def test_get_promotions(self):
        response = self.client.get(reverse("promotion_list"))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_filter_promotions_by_active(self):
        response = self.client.get(reverse("promotion_list"), {'active': True})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)
        self.assertTrue(all(promotion['active'] for promotion in data))

    def test_filter_promotions_by_special(self):
        response = self.client.get(reverse("promotion_list"), {'is_special': True})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertTrue(all(promotion['is_special'] for promotion in data))

class ProductListTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Categoria.objects.create(nombre="Electronics")
        self.promotion = Promotion.objects.create(name="Summer Sale", discount_in_percent=10, active=True)
        self.product1 = Producto.objects.create(product_name="Laptop", categoria=self.category, promotion=self.promotion, precio=1000, recommended=True)
        self.product2 = Producto.objects.create(product_name="Smartphone", categoria=self.category, promotion=self.promotion, precio=500, recommended=False)
        self.product3 = Producto.objects.create(product_name="Tablet", categoria=self.category, promotion=self.promotion, precio=300, recommended=True)

    def test_get_products(self):
        response = self.client.get(reverse("product_list"))
        self.assertEqual(response.status_code, 200)

    def test_filter_products_by_id(self):
        response = self.client.get(reverse("product_list"), {'id': self.product1.id})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["results"][0]["id"], self.product1.id)
        self.assertEqual(data["results"][0]["product_name"], self.product1.product_name)
        self.assertEqual(data["results"][0]["categoria"], self.category.id)
        self.assertEqual(data["results"][0]["promotion"], self.promotion.id)
        self.assertEqual(data["results"][0]["precio"], self.product1.precio)
        self.assertEqual(data["results"][0]["recommended"], self.product1.recommended)

    def test_filter_products_by_category(self):
        response = self.client.get(reverse("product_list"), {'categoria': self.category.id})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data["results"]), 3)

    def test_filter_products_by_promotion(self):
        response = self.client.get(reverse("product_list"), {'promotion': self.promotion.id})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data["results"]), 3)

    def test_filter_products_by_price(self):
        response = self.client.get(reverse("product_list"), {'precio': 500})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data["results"]), 1)
        self.assertEqual(data["results"][0]['product_name'], 'Smartphone')

    def test_filter_products_by_nonexistent_category(self):
        response = self.client.get(reverse("product_list"), {'categoria': 999})
        self.assertEqual(response.status_code, 400)

    def test_filter_products_by_nonexistent_promotion(self):
        response = self.client.get(reverse("product_list"), {'promotion': 999})
        self.assertEqual(response.status_code, 400)    

    def test_filter_products_by_recommended(self):
        response = self.client.get(reverse("product_list"), {'recommended': True})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data["results"]), 2)
        self.assertTrue(all(product['recommended'] for product in data["results"]))    
    
    def test_pagination(self):
        response = self.client.get(reverse("product_list"), {'page': 1, 'page_size': 2})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data["results"]), 2)
        self.assertEqual(data["count"], 3)