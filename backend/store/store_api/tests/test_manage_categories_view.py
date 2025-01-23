from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from ..models import Producto, Categoria, User
from store_api.utils import get_image

class ManageCategoriesTest(TestCase):
    CATEGORIES_MANAGEMENT_URL_NAME_LIST = "categories-managment-list"
    CATEGORIES_MANAGEMENT_URL_NAME_CREATE = "categories-managment-create"
    CATEGORIES_MANAGEMENT_URL_NAME_DETAIL = "categories-managment-detail"
    TEST_IMG_PATH = "store_api/tests/test_img.png"
    test_image = get_image(TEST_IMG_PATH)
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username="admin", email="admin@example.com", password="adminpass", is_staff=True)
        self.client.force_authenticate(user=self.user)

    def test_list_category_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 403)

    def test_list_category_non_admin(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        response = self.client.get(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 403)

    def test_create_category_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.post(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {"nombre": "New Category", "img": self.test_image}, format='multipart')
        self.assertEqual(response.status_code, 403)

    def test_create_category_non_admin(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        response = self.client.post(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {"nombre": "New Category", "img": self.test_image}, format='multipart')
        self.assertEqual(response.status_code, 403)

    def test_detail_category_unauthenticated(self):
        self.client.force_authenticate(user=None)
        category = Categoria.objects.create(nombre="Category detail", img=self.test_image)
        response = self.client.get(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args = [category.id]))
        self.assertEqual(response.status_code, 403)

    def test_detail_category_non_admin(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        category = Categoria.objects.create(nombre="Category detail", img=self.test_image)
        response = self.client.get(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args = [category.id]))
        self.assertEqual(response.status_code, 403)

    def test_delete_category_unauthenticated(self):
        self.client.force_authenticate(user=None)
        category = Categoria.objects.create(nombre="Category detail", img=self.test_image)
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args = [category.id]))
        self.assertEqual(response.status_code, 403)

    def test_update_category_non_admin(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        category = Categoria.objects.create(nombre="Category detail", img=self.test_image)
        response = self.client.put(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args = [category.id]))
        self.assertEqual(response.status_code, 403)

    def test_update_category_unauthenticated(self):
        self.client.force_authenticate(user=None)
        category = Categoria.objects.create(nombre="Category detail", img=self.test_image)
        response = self.client.put(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args = [category.id]))
        self.assertEqual(response.status_code, 403)

    def test_delete_category_non_admin(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass", is_staff=False)
        self.client.force_authenticate(user=non_admin_user)
        category = Categoria.objects.create(nombre="Category detail", img=self.test_image)
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args = [category.id]))
        self.assertEqual(response.status_code, 403)

    def test_create_category(self):
        response = self.client.post(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {"nombre": "New Category", "img":get_image(self.TEST_IMG_PATH)}, format='multipart')
        self.assertEqual(response.status_code, 201)

    def test_create_category_invalid_data(self):
        response = self.client.post(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {"nombre": ""}, format='multipart')
        self.assertEqual(response.status_code, 400)
        
    def test_create_category_max_limit(self):
        for i in range(24):
            Categoria.objects.create(nombre=f"Category {i}", img = self.test_image)
        response = self.client.post(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {"nombre": "New Category", "img":self.test_image}, format='multipart')
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data["message"], "Maximun number of categories reached")

    def test_list_categories(self):
        Categoria.objects.create(nombre="Category 1", img=self.test_image)
        Categoria.objects.create(nombre="Category 2", img=self.test_image)
        response = self.client.get(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_detail_category(self):
        category = Categoria.objects.create(nombre="Category detail", img=self.test_image)
        response = self.client.get(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args = [category.id]))
        self.assertEqual(response.status_code, 200)

    def test_update_category(self):
        category = Categoria.objects.create(nombre="Old Category", img=self.test_image)
        response = self.client.put(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]), {"nombre": "Updated Category", "img": get_image(self.TEST_IMG_PATH)}, format='multipart')
        self.assertEqual(response.status_code, 200)
        category.refresh_from_db()
        self.assertEqual(category.nombre, "Updated Category")

    def test_update_category_invalid_data(self):
        category = Categoria.objects.create(nombre="Old Category", img=self.test_image)
        response = self.client.put(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]), {"nombre": ""}, format='multipart')
        self.assertEqual(response.status_code, 400)
    
    def test_delete_category(self):
        category = Categoria.objects.create(nombre="Category to delete", img=self.test_image)
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Categoria.objects.filter(id=category.id).exists())

    def test_delete_non_existent_category(self):
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[9999]))
        self.assertEqual(response.status_code, 404)
    
    def test_delete_multiple_categories(self):
        category1 = Categoria.objects.create(nombre="Category to delete 1", img=self.test_image)
        category2 = Categoria.objects.create(nombre="Category to delete 2", img=self.test_image)
        categories_to_delete = [category1.id, category2.id]
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {'categories_to_delete':categories_to_delete}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Categoria.objects.filter(id=category1.id).exists())
        self.assertFalse(Categoria.objects.filter(id=category2.id).exists())

    def test_delete_multiple_categories_passing_empty_categories_to_delete_array(self):
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {'categories_to_delete': []}, format="json")
        self.assertEqual(response.status_code, 400)

    def test_delete_multiple_categories_mixed_ids(self):
        category = Categoria.objects.create(nombre="Valid Category", img=self.test_image)
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {'categories_to_delete': [category.id, 9999]}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Categoria.objects.filter(id=category.id).exists())

    def test_add_products_to_category(self):
        category = Categoria.objects.create(nombre="Test Category", img=self.test_image)
        product1 = Producto.objects.create(product_name="Laptop", categoria=None, precio=1000, recommended=True)
        product2 = Producto.objects.create(product_name="Smartphone", categoria=None, precio=500, recommended=False)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]) + 'add_products_to_category/'
        response = self.client.post(url, {'products': [product1.id, product2.id]}, format='json')
        self.assertEqual(response.status_code, 200)
        product1.refresh_from_db()
        product2.refresh_from_db()
        self.assertEqual(product1.categoria.id, category.id)
        self.assertEqual(product2.categoria.id, category.id)

    def test_add_products_to_non_existent_category(self):
        product = Producto.objects.create(product_name="Test Product", precio=100)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[9999]) + 'add_products_to_category/'
        response = self.client.post(url, {'products': [product.id]}, format='json')
        self.assertEqual(response.status_code, 404)
    
    def test_add_products_to_category_missing_products_param(self):
        category = Categoria.objects.create(nombre="Test Category", img=self.test_image)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]) + 'add_products_to_category/'
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, 400)    

    def test_add_products_to_category_nonexisting_product_id(self):
        category = Categoria.objects.create(nombre="Test Category", img=self.test_image)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]) + 'add_products_to_category/'
        response = self.client.post(url, {"products":[9994454]}, format='json')
        self.assertEqual(response.status_code, 400)  

    def test_add_products_to_category_invalid_product_id(self):
        category = Categoria.objects.create(nombre="Test Category", img=self.test_image)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]) + 'add_products_to_category/'
        response = self.client.post(url, {"products":["asdfdf"]}, format='json')
        self.assertEqual(response.status_code, 400)    

    def test_remove_products_from_category(self):
        category = Categoria.objects.create(nombre="Test Category", img=self.test_image)
        product1 = Producto.objects.create(product_name="Laptop", categoria=category, precio=1000, recommended=True)
        product2 = Producto.objects.create(product_name="Smartphone", categoria=category, precio=500, recommended=False)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]) + 'remove_products_from_category/'
        response = self.client.post(url, {'products': [product1.id, product2.id]}, format='json')
        self.assertEqual(response.status_code, 200)
        product1.refresh_from_db()
        product2.refresh_from_db()
        self.assertIsNone(product1.categoria)
        self.assertIsNone(product2.categoria)

    def test_remove_products_from_non_existent_category(self):
        product = Producto.objects.create(product_name="Test Product", precio=100)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[9999]) + 'remove_products_from_category/'
        response = self.client.post(url, {'products': [product.id]}, format='json')
        self.assertEqual(response.status_code, 404)
    

    def test_remove_products_from_category_nonexisting_product_id(self):
        category = Categoria.objects.create(nombre="Test Category", img=self.test_image)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]) + 'remove_products_from_category/'
        response = self.client.post(url, {"products":[9994454]}, format='json')
        self.assertEqual(response.status_code, 400)  

    def test_remove_products_from_category_invalid_product_id(self):
        category = Categoria.objects.create(nombre="Test Category", img=self.test_image)
        url = reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]) + 'remove_products_from_category/'
        response = self.client.post(url, {"products":["asdfdf"]}, format='json')
        self.assertEqual(response.status_code, 400)     