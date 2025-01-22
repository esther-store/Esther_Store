from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from ..models import Score, Producto, Categoria, Promotion, User
from store_api.utils import get_image

class ManageCategoriesTest(TestCase):
    CATEGORIES_MANAGEMENT_URL_NAME_LIST = "categories-managment-list"
    CATEGORIES_MANAGEMENT_URL_NAME_CREATE = "categories-managment-create"
    CATEGORIES_MANAGEMENT_URL_NAME_DETAIL = "categories-managment-detail"
    test_image = get_image("store_api/tests/test_img.png")
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username="admin", email="admin@example.com", password="adminpass", is_staff=True)
        self.client.force_authenticate(user=self.user)
           
    def test_create_category(self):
        response = self.client.post(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {"nombre": "New Category", "img":get_image("store_api/tests/test_img.png")}, format='multipart')
        self.assertEqual(response.status_code, 201)

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
        response = self.client.put(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]), {"nombre": "Updated Category", "img": get_image("store_api/tests/test_img.png")}, format='multipart')
        self.assertEqual(response.status_code, 200)
        category.refresh_from_db()
        self.assertEqual(category.nombre, "Updated Category")

    def test_delete_category(self):
        category = Categoria.objects.create(nombre="Category to delete", img=self.test_image)
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_DETAIL, args=[category.id]))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Categoria.objects.filter(id=category.id).exists())
    
    def test_delete_multiple_categories(self):
        category1 = Categoria.objects.create(nombre="Category to delete 1", img=self.test_image)
        category2 = Categoria.objects.create(nombre="Category to delete 2", img=self.test_image)
        categories_to_delete = [category1.id, category2.id]
        response = self.client.delete(reverse(self.CATEGORIES_MANAGEMENT_URL_NAME_LIST), {'categories_to_delete':categories_to_delete}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Categoria.objects.filter(id=category1.id).exists())
        self.assertFalse(Categoria.objects.filter(id=category2.id).exists())

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

# class PromotionsManagmentTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create(username="admin", email="admin@example.com", password="adminpass", is_staff=True)
#         self.client.force_authenticate(user=self.user)

#     def test_create_promotion(self):
#         response = self.client.post(reverse("promotions_managment"), {"name": "New Promotion", "discount_in_percent": 10, "active": True}, format="json")
#         self.assertEqual(response.status_code, 201)

#     def test_create_promotion_max_limit(self):
#         for i in range(24):
#             Promotion.objects.create(name=f"Promotion {i}", discount_in_percent=10, active=True)
#         response = self.client.post(reverse("promotions_managment"), {"name": "New Promotion", "discount_in_percent": 10, "active": True}, format="json")
#         self.assertEqual(response.status_code, 403)
#         self.assertEqual(response.data["message"], "Maximun number of promotions reached")

# class ProductsManagmentTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.user = User.objects.create(username="admin", email="admin@example.com", password="adminpass", is_staff=True)
#         self.client.force_authenticate(user=self.user)
#         self.category = Categoria.objects.create(nombre="Electronics")

#     def test_create_product(self):
#         response = self.client.post(reverse("products_managment"), {"product_name": "New Product", "precio": 100.0, "categoria": self.category.id}, format="json")
#         self.assertEqual(response.status_code, 201)