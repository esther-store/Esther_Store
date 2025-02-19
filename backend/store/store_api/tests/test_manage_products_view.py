from django.urls import reverse
from rest_framework.test import APIClient
from ..models import Producto, Categoria, Promotion, User
from store_api.utils import get_image
from django.test import TestCase, override_settings
from django.conf import settings
import shutil
import os

@override_settings(MEDIA_ROOT=os.path.join(settings.BASE_DIR, 'test_images'))
class ProductsManagmentTests(TestCase):
    PRODUCTS_MANAGEMENT_URL_NAME_LIST = 'products-managment-list'
    PRODUCTS_MANAGEMENT_URL_NAME_DETAIL = 'products-managment-detail'
    TEST_IMG_PATH = "store_api/tests/test_img.png"
    test_image = get_image(TEST_IMG_PATH)

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username="admin", email="admin@example.com", password="adminpass", is_staff=True)
        self.client.force_authenticate(user=self.user)
        self.category = Categoria.objects.create(nombre="Test Category", img=self.test_image)
        self.promotion = Promotion.objects.create(name="Test Promotion", description="Test description", discount_in_percent=10, img=self.test_image)

    # Delete created images during testing
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        media_root = os.path.join(settings.BASE_DIR, 'test_images')
        if os.path.exists(media_root):
            shutil.rmtree(media_root)

    def test_list_products_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 403)

    def test_list_products_non_admin(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 403)
        
    def test_detail_products_unauthenticated(self):
        self.client.force_authenticate(user=None)
        product = Producto.objects.create(product_name="Product 1", precio=100, product_img1=self.test_image)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args = [product.id]))
        self.assertEqual(response.status_code, 403)

    def test_detail_products_non_admin(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        product = Producto.objects.create(product_name="Product 1", precio=100, product_img1=self.test_image)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args = [product.id]))
        self.assertEqual(response.status_code, 403)

    def test_create_product_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.post(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST), {
            "product_name": "New Product",
            "product_description": "New description",
            "precio": 100,
            "categoria": self.category.id,
            "product_img1": get_image(self.TEST_IMG_PATH)
        }, format='multipart')
        self.assertEqual(response.status_code, 403)

    def test_create_product_non_admin(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        response = self.client.post(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST), {
                    "product_name": "New Product",
                    "product_description": "New description",
                    "precio": 100,
                    "categoria": self.category.id,
                    "product_img1": get_image(self.TEST_IMG_PATH)
                }, format='multipart')        
        self.assertEqual(response.status_code, 403)

    def test_update_product_unauthenticated(self):
        product = Producto.objects.create(product_name="Product to delete", precio=100, product_img1=self.test_image)
        self.client.force_authenticate(user=None)
        response = self.client.put(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[product.id]))
        self.assertEqual(response.status_code, 403)

    def test_update_product_non_admin_user(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        product = Producto.objects.create(product_name="Product to delete", precio=100, product_img1=self.test_image)
        self.client.force_authenticate(user=None)
        response = self.client.put(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[product.id]))
        self.assertEqual(response.status_code, 403)

    def test_delete_product_unauthenticated(self):
        product = Producto.objects.create(product_name="Product to delete", precio=100, product_img1=self.test_image)
        self.client.force_authenticate(user=None)
        response = self.client.delete(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[product.id]))
        self.assertEqual(response.status_code, 403)

    def test_delete_product_non_admin_user(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        product = Producto.objects.create(product_name="Product to delete", precio=100, product_img1=self.test_image)
        self.client.force_authenticate(user=None)
        response = self.client.delete(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[product.id]))
        self.assertEqual(response.status_code, 403)
    
    def test_create_product(self):
        response = self.client.post(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST), {
            "product_name": "New Product",
            "product_description": "New description",
            "precio": 100,
            "categoria": self.category.id,
            "product_img1": get_image(self.TEST_IMG_PATH)
        }, format='multipart')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Producto.objects.filter(product_name="New Product").exists())

    def test_list_products(self):
        Producto.objects.create(product_name="Product 1", precio=100, product_img1=self.test_image)
        Producto.objects.create(product_name="Product 2", precio=200, product_img1=self.test_image)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 2)

    def test_detail_product(self):
        product = Producto.objects.create(product_name="Test Product", precio=100, product_img1=self.test_image)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[product.id]))
        self.assertEqual(response.status_code, 200)

    def test_update_product(self):
        product = Producto.objects.create(product_name="Old Product", precio=100, product_img1=self.test_image)
        response = self.client.put(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[product.id]), {
            "product_name": "Updated Product",
            "precio": 150,
            "product_img1": get_image(self.TEST_IMG_PATH)
        }, format='multipart')
        self.assertEqual(response.status_code, 200)
        product.refresh_from_db()
        self.assertEqual(product.product_name, "Updated Product")
        self.assertEqual(product.precio, 150)

    def test_delete_product(self):
        product = Producto.objects.create(product_name="Product to delete", precio=100, product_img1=self.test_image)
        response = self.client.delete(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[product.id]))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Producto.objects.filter(id=product.id).exists())

    def test_delete_non_existent_product(self):
        response = self.client.delete(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[9999]))
        self.assertEqual(response.status_code, 404)

    def test_delete_products_with_invalid_ids(self):
        response = self.client.delete(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST), {'products_to_delete': [9999]}, format="json")
        self.assertEqual(response.status_code, 400)

    def test_delete_products_with_empty_products_to_delete_array(self):
        response = self.client.delete(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST), {'products_to_delete': []}, format="json")
        self.assertEqual(response.status_code, 400)
    

    def test_delete_multiple_products(self):
        product1 = Producto.objects.create(product_name="Product to delete 1", precio=100, product_img1=self.test_image)
        product2 = Producto.objects.create(product_name="Product to delete 2", precio=200, product_img1=self.test_image)
        products_to_delete = [product1.id, product2.id]
        response = self.client.delete(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST), {'products_to_delete': products_to_delete}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Producto.objects.filter(id__in=products_to_delete).exists())

    def test_filter_products(self):
        Producto.objects.create(product_name="Active Product", precio=100, product_img1=self.test_image, is_active=True)
        Producto.objects.create(product_name="Inactive Product", precio=200, product_img1=self.test_image, is_active=False)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST) + '?is_active=true')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['product_name'], "Active Product")

    def test_search_products(self):
        Producto.objects.create(product_name="Laptop", precio=1000, product_img1=self.test_image)
        Producto.objects.create(product_name="Smartphone", precio=500, product_img1=self.test_image)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST) + '?search=Laptop')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['product_name'], "Laptop")

    def test_order_products(self):
        Producto.objects.create(product_name="B Product", precio=200, product_img1=self.test_image)
        Producto.objects.create(product_name="A Product", precio=100, product_img1=self.test_image)
        response = self.client.get(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST) + '?ordering=product_name')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['results'][0]['product_name'], "A Product")
        self.assertEqual(response.data['results'][1]['product_name'], "B Product")

    def test_create_product_with_invalid_data(self):
        response = self.client.post(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_LIST), {
            "product_name": "",
            "precio": -100,
        }, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_update_product_with_invalid_data(self):
        product = Producto.objects.create(product_name="Test Product", precio=100, product_img1=self.test_image)
        response = self.client.put(reverse(self.PRODUCTS_MANAGEMENT_URL_NAME_DETAIL, args=[product.id]), {
            "precio": -50,
        }, format='multipart')
        self.assertEqual(response.status_code, 400)
