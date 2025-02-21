from django.core.management.base import BaseCommand
from contact_info.initial_data import run as run_contact_info_initial_data
from store.settings import MEDIA_ROOT, BASE_DIR
from store_api.constants import PRODUCTS_MEDIA_FOLDER
import os
import shutil

class Command(BaseCommand):
    help = 'Load initial data into the database'

    def handle(self, *args, **kwargs):
        run_contact_info_initial_data()
        move_product_image_placeholder_to_product_folder()
        self.stdout.write(self.style.SUCCESS('Initial data loaded successfully'))

def move_product_image_placeholder_to_product_folder():
    print("Coping product image placeholder into media ...")
    try:
        product_media_folder = os.path.join(MEDIA_ROOT, PRODUCTS_MEDIA_FOLDER)
        image_placeholder_path = os.path.join(BASE_DIR, 'seed/products_image_placeholder/blank.webp')
        
        #check if media folder exists
        if not os.path.exists(MEDIA_ROOT):
            os.mkdir(MEDIA_ROOT)
        
        #check if product media folder exists
        if not os.path.exists(product_media_folder):
            os.mkdir(product_media_folder)
        
        #check if product image placeholder exists    
        if os.path.exists(image_placeholder_path):
            shutil.copy(image_placeholder_path, product_media_folder)
    except Exception as e:
        print(f"Error coping product image placeholder into media: {e}")    
