from django.urls import reverse
from rest_framework.test import APIClient
from ..models import Producto, Promotion, User
from store_api.utils import get_image
from django.test import TestCase, override_settings
from django.conf import settings
import shutil
import os

@override_settings(MEDIA_ROOT=os.path.join(settings.BASE_DIR, 'test_images'))
class ManagePromotionsTests(TestCase):
    PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL = 'promotion-managment-detail'
    PROMOTIONS_MANAGEMENT_URL_NAME_LIST = 'promotion-managment-list'
    TEST_IMG_PATH = "store_api/tests/test_img.png"
    test_image = get_image(TEST_IMG_PATH)
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username="admin", email="admin@example.com", password="adminpass", is_staff=True)
        self.client.force_authenticate(user=self.user)

    # Delete created images during testing
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        media_root = os.path.join(settings.BASE_DIR, 'test_images')
        if os.path.exists(media_root):
            shutil.rmtree(media_root)

    def test_list_promotion_unauthenticated(self):
        unauthenticated_client = APIClient()
        response = unauthenticated_client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 403)

    def test_list_promotion_non_admin_user(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass")
        non_admin_client = APIClient()
        non_admin_client.force_authenticate(user=non_admin_user)
        response = non_admin_client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 403)

    def test_create_promotion_unauthenticated(self):
        unauthenticated_client = APIClient()
        response = unauthenticated_client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {"name": "Unauthorized"}, format='json')
        self.assertEqual(response.status_code, 403)

    def test_create_promotion_non_admin_user(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass")
        non_admin_client = APIClient()
        non_admin_client.force_authenticate(user=non_admin_user)
        response = non_admin_client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {"name": "Unauthorized"}, format='json')
        self.assertEqual(response.status_code, 403)

    def test_detail_promotion_unauthenticated(self):
        unauthenticated_client = APIClient()
        promotion = Promotion.objects.create(name="Promotion 1", description="Test description 1", discount_in_percent=10, img=self.test_image)
        response = unauthenticated_client.get(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]))
        self.assertEqual(response.status_code, 403)

    def test_detail_promotion_non_admin_user(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass")
        non_admin_client = APIClient()
        non_admin_client.force_authenticate(user=non_admin_user)
        promotion = Promotion.objects.create(name="Promotion 1", description="Test description 1", discount_in_percent=10, img=self.test_image)
        response = non_admin_client.get(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]))
        self.assertEqual(response.status_code, 403)

    def test_update_promotion_unauthenticated(self):
        unauthenticated_client = APIClient()
        promotion = Promotion.objects.create(name="Promotion 1", description="Test description 1", discount_in_percent=10, img=self.test_image)
        response = unauthenticated_client.delete(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]))
        self.assertEqual(response.status_code, 403)

    def test_update_promotion_non_admin_user(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass")
        non_admin_client = APIClient()
        non_admin_client.force_authenticate(user=non_admin_user)
        promotion = Promotion.objects.create(name="Promotion 1", description="Test description 1", discount_in_percent=10, img=self.test_image)
        response = non_admin_client.put(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]))
        self.assertEqual(response.status_code, 403)
    
    def test_delete_promotion_unauthenticated(self):
        unauthenticated_client = APIClient()
        promotion = Promotion.objects.create(name="Promotion 1", description="Test description 1", discount_in_percent=10, img=self.test_image)
        response = unauthenticated_client.delete(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]))
        self.assertEqual(response.status_code, 403)

    def test_delete_promotion_non_admin_user(self):
        non_admin_user = User.objects.create(username="user", email="user@example.com", password="userpass")
        non_admin_client = APIClient()
        non_admin_client.force_authenticate(user=non_admin_user)
        promotion = Promotion.objects.create(name="Promotion 1", description="Test description 1", discount_in_percent=10, img=self.test_image)
        response = non_admin_client.put(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]))
        self.assertEqual(response.status_code, 403)

    def test_create_promotion(self):
        response = self.client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {"name": "New Promotion", "description": "New description", "discount_in_percent": 10, "img": get_image(self.TEST_IMG_PATH)}, format='multipart')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Promotion.objects.filter(name="New Promotion").exists())

    def test_create_promotion_with_below_minimum_discount(self):
        response = self.client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {"name": "Invalid Discount", "description": "Test", "discount_in_percent": 0.5, "img": self.test_image}, format='multipart')
        self.assertEqual(response.status_code, 400)    

    def test_create_promotion_max_limit(self):
        for i in range(24):
            Promotion.objects.create(name=f"Promotion {i}", description="Test description", discount_in_percent=10, img=self.test_image)
        response = self.client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {"name": "New Promotion", "description": "New description", "discount_in_percent": 10, "img": self.test_image}, format='multipart')
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data["message"], "Maximun number of promotions reached")

    def test_create_promotion_invalid_data_types(self):
        response = self.client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {"name": "Invalid Data", "discount_in_percent": "ten"}, format='json')
        self.assertEqual(response.status_code, 400)    

    def test_create_promotion_missing_required_fields(self):
        response = self.client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {"description": "Missing fields"}, format='json')
        self.assertEqual(response.status_code, 400)    

    def test_list_promotions(self):
        Promotion.objects.create(name="Promotion 1", description="Test description 1", discount_in_percent=10, img=self.test_image)
        Promotion.objects.create(name="Promotion 2", description="Test description 2", discount_in_percent=10, img=self.test_image)
        response = self.client.get(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_filter_promotions(self):
        Promotion.objects.create(name="Special Active", description="Test", discount_in_percent=10, img=self.test_image, is_special=True, active=True)
        Promotion.objects.create(name="Regular Inactive", description="Test", discount_in_percent=10, img=self.test_image, is_special=False, active=False)
        response = self.client.get(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST) + '?is_special=true&active=true')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Special Active")    

    def test_filter_promotions_invalid_parameters_does_not_affect(self):
        response = self.client.get(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST) + '?unknown_field=true')
        self.assertEqual(response.status_code, 200)    

    def test_detail_promotion(self):
        promotion = Promotion.objects.create(name="Promotion detail", description="Test description", discount_in_percent=10, img=self.test_image)
        response = self.client.get(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]))
        self.assertEqual(response.status_code, 200)

    def test_detail_promotion_invalid_id(self):
        response = self.client.get(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[99999]))
        self.assertEqual(response.status_code, 404)

    def test_update_promotion(self):
        promotion = Promotion.objects.create(name="Old Promotion", description="Old description", discount_in_percent=10, img=self.test_image)
        response = self.client.put(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]), {"name": "Updated Promotion", "description": "Updated description", "discount_in_percent": 15, "img": get_image(self.TEST_IMG_PATH)}, format='multipart')
        self.assertEqual(response.status_code, 200)
        promotion.refresh_from_db()
        self.assertEqual(promotion.name, "Updated Promotion")
        self.assertEqual(promotion.description, "Updated description")

    def test_update_promotion_without_image(self):
        promotion = Promotion.objects.create(name="Old Promotion", description="Old", discount_in_percent=10, img=self.test_image)
        response = self.client.put(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]), {"name": "Updated Promotion", "description": "New", "discount_in_percent": 15}, format='json')
        self.assertEqual(response.status_code, 200)   

    def test_update_promotion_invalid_discount(self):
        promotion = Promotion.objects.create(name="Old Promotion", description="Old", discount_in_percent=10, img=self.test_image)
        response = self.client.put(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]), {"name": "Updated Promotion", "discount_in_percent": -5}, format='json')
        self.assertEqual(response.status_code, 400)    

    def test_delete_promotion(self):
        promotion = Promotion.objects.create(name="Promotion to delete", description="Test description", discount_in_percent=10, img=self.test_image)
        response = self.client.delete(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Promotion.objects.filter(id=promotion.id).exists())

    def test_concurrent_delete_and_create_promotions(self):
        promotion1 = Promotion.objects.create(name="Promotion to delete", description="Test description", discount_in_percent=10, img=self.test_image)
        
        # Simulate concurrent requests
        delete_response = self.client.delete(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {'promotions_to_delete': [promotion1.id]}, format="json")
        create_response = self.client.post(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {"name": "New Promotion", "description": "New description", "discount_in_percent": 10, "img":get_image(self.TEST_IMG_PATH)}, format='multipart')

        # Verify responses
        self.assertEqual(delete_response.status_code, 200)
        self.assertEqual(create_response.status_code, 201)
        self.assertFalse(Promotion.objects.filter(id=promotion1.id).exists())    
    
    def test_delete_multiple_promotions(self):
        promotion1 = Promotion.objects.create(name="Promotion to delete 1", description="Test description 1", discount_in_percent=10, img=self.test_image)
        promotion2 = Promotion.objects.create(name="Promotion to delete 2", description="Test description 2", discount_in_percent=10, img=self.test_image)
        promotions_to_delete = [promotion1.id, promotion2.id]
        response = self.client.delete(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {'promotions_to_delete': promotions_to_delete}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Promotion.objects.filter(id=promotion1.id).exists())
        self.assertFalse(Promotion.objects.filter(id=promotion2.id).exists())

    def test_delete_promotions_mixed_valid_invalid_ids(self):
        promotion = Promotion.objects.create(name="Valid Promotion", description="Test", discount_in_percent=10, img=self.test_image)
        response = self.client.delete(reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_LIST), {'promotions_to_delete': [promotion.id, 9999]}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Promotion.objects.filter(id=promotion.id).exists())    

    def test_add_products_to_promotion(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test description", discount_in_percent=10, img=self.test_image)
        product1 = Producto.objects.create(product_name="Laptop", categoria=None, precio=1000, recommended=True)
        product2 = Producto.objects.create(product_name="Smartphone", categoria=None, precio=500, recommended=False)
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'add_products_to_promotion/'
        response = self.client.post(url, {'products': [product1.id, product2.id]}, format='json')
        self.assertEqual(response.status_code, 200)
        product1.refresh_from_db()
        product2.refresh_from_db()
        self.assertEqual(product1.promotion.id, promotion.id)
        self.assertEqual(product2.promotion.id, promotion.id)

    def test_add_products_to_nonexistent_promotion(self):
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[9999]) + 'add_products_to_promotion/'
        response = self.client.post(url, {'products': [1, 2]}, format='json')
        self.assertEqual(response.status_code, 404)    

    def test_add_products_to_promotion_missing_products_param(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test description", discount_in_percent=10, img=self.test_image)
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'add_products_to_promotion/'
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, 400)  

    def test_add_products_empty_list(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test", discount_in_percent=10, img=self.test_image)
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'add_products_to_promotion/'
        response = self.client.post(url, {'products': []}, format='json')
        self.assertEqual(response.status_code, 400)      

    def test_add_products_to_promotion_nonexisting_products(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test description", discount_in_percent=10, img=self.test_image)
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'add_products_to_promotion/'
        response = self.client.post(url, {'products': [9999]}, format='json')
        self.assertEqual(response.status_code, 400)

    def test_add_products_to_promotion_invalid_product_id(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test description", discount_in_percent=10, img=self.test_image)
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'add_products_to_promotion/'
        response = self.client.post(url, {"products":["asdfdf"]}, format='json')
        self.assertEqual(response.status_code, 400)    

    def test_remove_products_from_promotion(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test description", discount_in_percent=10, img=self.test_image)
        product1 = Producto.objects.create(product_name="Laptop", promotion=promotion, precio=1000, recommended=True)
        product2 = Producto.objects.create(product_name="Smartphone", promotion=promotion, precio=500, recommended=False)
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'remove_products_from_promotion/'
        response = self.client.post(url, {'products': [product1.id, product2.id]}, format='json')
        self.assertEqual(response.status_code, 200)
        product1.refresh_from_db()
        product2.refresh_from_db()
        self.assertIsNone(product1.promotion)
        self.assertIsNone(product2.promotion)
        
    def test_remove_products_from_nonexistent_promotion(self):
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[9999]) + 'remove_products_from_promotion/'
        response = self.client.post(url, {'products': [1, 2]}, format='json')
        self.assertEqual(response.status_code, 404)

    def test_remove_products_empty_list(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test", discount_in_percent=10, img=self.test_image)
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'remove_products_from_promotion/'
        response = self.client.post(url, {'products': []}, format='json')
        self.assertEqual(response.status_code, 400)    

    def test_remove_products_from_promotion_nonexisting_product_id(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test description", discount_in_percent=10, img="path/to/test_image.jpg")
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'remove_products_from_promotion/'
        response = self.client.post(url, {"products":[9994454]}, format='json')
        self.assertEqual(response.status_code, 400)  

    def test_remove_products_from_promotion_invalid_product_id(self):
        promotion = Promotion.objects.create(name="Test Promotion", description="Test description", discount_in_percent=10, img="path/to/test_image.jpg")
        url = reverse(self.PROMOTIONS_MANAGEMENT_URL_NAME_DETAIL, args=[promotion.id]) + 'remove_products_from_promotion/'
        response = self.client.post(url, {"products":["asdfdf"]}, format='json')
        self.assertEqual(response.status_code, 400)    
