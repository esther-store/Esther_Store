from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from store_api.models import Producto, Categoria, Promotion
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from django.conf import settings
import shutil
import os

@override_settings(MEDIA_ROOT=os.path.join(settings.BASE_DIR, 'test_images'))
class ProductoModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Crear objetos necesarios para las pruebas
        cls.categoria = Categoria.objects.create(nombre="Test Category")
        cls.promotion = Promotion.objects.create(name="Test Promotion", discount_in_percent=10)
        
        # Crear un producto de prueba
        cls.producto = Producto.objects.create(
            product_name="Test Product",
            product_description="This is a test product",
            precio=100.00,
            categoria=cls.categoria,
            promotion=cls.promotion
        )

    # Delete created images during testing
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        media_root = os.path.join(settings.BASE_DIR, 'test_images')
        if os.path.exists(media_root):
            shutil.rmtree(media_root)    

    def test_product_creation(self):
        self.assertTrue(isinstance(self.producto, Producto))
        self.assertEqual(self.producto.__str__(), self.producto.product_name)

    def test_product_name_unique(self):
        with self.assertRaises(IntegrityError):
            Producto.objects.create(product_name="Test Product")

    def test_price_with_discounts(self):
        # Probar el cálculo del precio con descuentos
        self.producto.descuento = 20
        self.producto.save()
        expected_price = 100 - (100 * 0.2) - (100 * 0.1)
        self.assertAlmostEqual(self.producto.price_with_discounts, expected_price, places=2)

    def test_update_puntuacion(self):
        self.producto.update_puntuacion(4)
        self.assertEqual(self.producto.cantidad_puntuaciones, 1)
        self.assertEqual(self.producto.total_puntos, 4)
        self.assertEqual(self.producto.puntuacion, 4)

        self.producto.update_puntuacion(5)
        self.assertEqual(self.producto.cantidad_puntuaciones, 2)
        self.assertEqual(self.producto.total_puntos, 9)
        self.assertEqual(self.producto.puntuacion, 4)  # 9/2 = 4.5, redondeado a 4

    def test_precio_validation(self):
        with self.assertRaises(ValidationError):
            producto = Producto(product_name="Invalid Price", precio=-10)
            producto.full_clean()

    def test_in_stock_validation(self):
        with self.assertRaises(ValidationError):
            producto = Producto(product_name="Invalid Stock", in_stock=-5)
            producto.full_clean()

    def test_descuento_validation(self):
        with self.assertRaises(ValidationError):
            producto = Producto(product_name="Invalid Discount", descuento=101)
            producto.full_clean()

    def test_product_image_upload(self):
        image = SimpleUploadedFile("test_image.jpg", b"file_content", content_type="image/jpeg")
        self.producto.product_img1 = image
        self.producto.save()
        self.assertTrue(self.producto.product_img1.name.startswith('productos_images/'))

    def test_keywords_generation(self):
        # Asumiendo que utils.generate_product_keywords() está implementado correctamente
        self.assertTrue(len(self.producto.keywords) > 0)
        for word in self.producto.product_name.lower().split(" "):
            self.assertIn(word, self.producto.keywords.lower())
        self.assertIn(self.categoria.nombre.lower(), self.producto.keywords.lower())

    def test_is_active_default(self):
        self.assertTrue(self.producto.is_active)

    def test_recommended_default(self):
        self.assertFalse(self.producto.recommended)

    def test_categoria_deletion(self):
        self.categoria.delete()
        producto_actualizado = Producto.objects.get(id=self.producto.id)
        self.assertIsNone(producto_actualizado.categoria)

    def test_promotion_deletion(self):
        self.promotion.delete()
        producto_actualizado = Producto.objects.get(id=self.producto.id)
        self.assertIsNone(producto_actualizado.promotion)

    def test_price_with_discounts_no_discount(self):
        producto = Producto.objects.create(product_name="No Discount", precio=100.00)
        self.assertEqual(producto.price_with_discounts, 100.00)

    def test_price_with_discounts_product_discount_only(self):
        producto = Producto.objects.create(product_name="Product Discount", precio=100.00, descuento=20)
        self.assertEqual(producto.price_with_discounts, 80.00)

    def test_price_with_discounts_promotion_only(self):
        promotion = Promotion.objects.create(name="Active Promotion", discount_in_percent=15, active=True)
        producto = Producto.objects.create(product_name="Promotion Discount", precio=100.00, promotion=promotion)
        self.assertEqual(producto.price_with_discounts, 85.00)

    def test_price_with_discounts_both_discounts(self):
        promotion = Promotion.objects.create(name="Active Promotion", discount_in_percent=15, active=True)
        producto = Producto.objects.create(product_name="Both Discounts", precio=100.00, descuento=20, promotion=promotion)
        self.assertEqual(producto.price_with_discounts, 65.00)

    def test_price_with_discounts_inactive_promotion(self):
        promotion = Promotion.objects.create(name="Inactive Promotion", discount_in_percent=15, active=False)
        producto = Producto.objects.create(product_name="Inactive Promotion", precio=100.00, promotion=promotion)
        self.assertEqual(producto.price_with_discounts, 100.00)

    def test_price_with_discounts_zero_price(self):
        producto = Producto.objects.create(product_name="Zero Price", precio=0.00, descuento=20)
        self.assertEqual(producto.price_with_discounts, 0.00)

    def test_price_with_discounts_max_discount(self):
        promotion = Promotion.objects.create(name="Max Discount", discount_in_percent=100, active=True)
        producto = Producto.objects.create(product_name="Max Discount", precio=100.00, descuento=100, promotion=promotion)
        self.assertEqual(producto.price_with_discounts, 0.00)

    def test_price_with_discounts_negative_result(self):
        promotion = Promotion.objects.create(name="Over Discount", discount_in_percent=60, active=True)
        producto = Producto.objects.create(product_name="Negative Result", precio=100.00, descuento=50, promotion=promotion)
        self.assertEqual(producto.price_with_discounts, 0.00)  # Asumiendo que no permitimos precios negativos

    def test_price_with_discounts_null_promotion(self):
        producto = Producto.objects.create(product_name="Null Promotion", precio=100.00, promotion=None)
        self.assertEqual(producto.price_with_discounts, 100.00)

    def test_price_with_discounts_float_precision(self):
        producto = Producto.objects.create(product_name="Float Precision", precio=100.33, descuento=33.33)
        self.assertAlmostEqual(producto.price_with_discounts, 66.89, places=2)
